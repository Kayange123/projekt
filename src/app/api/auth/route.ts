import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb'

export async function POST(req: NextRequest){
    const body = await req.json();
    const {email, name, password} = body
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    }) 

    return NextResponse.json(user, {status: 201, statusText: 'created'})
}