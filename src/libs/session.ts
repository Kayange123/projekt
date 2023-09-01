import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/constants/common.types";

export const authOptions: NextAuthOptions = {
     
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: '',
            clientSecret: ''
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }
                const user = await prisma?.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid User');
                }
                const isCorrectPass = await bcrypt.compare(credentials?.password, user?.hashedPassword);
                if(!isCorrectPass) throw new Error('Invalid password')

                return user;
            }
        })
    ],
    

    jwt: {
        encode : ({secret, token})=> {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: 'prisma',
                exp: Math.floor(Date.now()/1000) + 60*60
            }, secret)
            return encodedToken;
        },
        decode: async ({secret, token})=> {
            const decodedToken = jsonwebtoken.verify(token as string, secret) as JWT ;
            return decodedToken;
        }
    },
    theme : {
        logo : '/logo.svg',
        colorScheme: 'auto',
        
    },
    callbacks: {
        async signIn({user}: {user : AdapterUser | User}) {
            try {
                //Check the user from the database!
                const userExists = await prisma?.user?.findUnique({where: {email: user?.email as string}}) as {user?: UserProfile}
                
                //If does not exist, create the user
                if(!userExists.user){
                    const result= await prisma.user?.create({
                        data : {
                            email: user?.email as string,
                            name: user?.name as string,
                            image: user?.image as string,       
                        }
                    })
                    return true
                  //const res =  await createUser(user?.name as string, user?.email as string, user?.image as string)
                   //console.log('res', res);
                }
                return true;
            } catch (error) {
               
                return false;
            }
        },
         async session({session}) {
            const email = session?.user?.email as string;
            
            try {
                const user = await prisma?.user?.findUnique({where: {email: email}}) as {user?: UserProfile }
                const newSession = {...session, user: {...session?.user, ...user?.user}}
                return newSession; 
            } catch (error) {
                throw new Error('Error fetching user from database');
    
            }
            
        },
        
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const getCurrentUser = async () =>{
    try {
        const session  = await getServerSession(authOptions) as SessionInterface ;
        return session;
    } catch (error) {
        return null;
    }  
}