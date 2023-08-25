import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/constants/common.types";
import { createUser, fetchUser,  } from "@/utils/actions";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: '',
            clientSecret: ''
        })
    ],
    jwt: {
        encode : ({secret, token})=> {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: 'grafbase',
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
         async session({session}) {
            const email = session?.user?.email as string;
            try {
                const user = fetchUser(email) as {user?: UserProfile};
                const newSession = {...session, user: {...session?.user, ...user?.user}}  
                return newSession;
            } catch (error) {
                console.log('Error retrieving user from the database');
                return session;
            }
            
        },
        async signIn({user}: {user : AdapterUser | User}) {
            try {
                //Check the user from the database!
                const userExists = fetchUser(user?.email as string) as {user?: UserProfile}
                //If exists
                if(!userExists?.user){
                    await createUser(user?.name as string, user?.email as string, user?.image as string)
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
}

export const getCurrentUser = async () =>{

    const session  = await getServerSession(authOptions) as SessionInterface ;

    return session;
}