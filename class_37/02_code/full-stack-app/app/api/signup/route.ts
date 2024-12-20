import { NextResponse } from "next/server";
import prisma from "@/app/database/db";

export async function POST(req:NextResponse){

    const detail = await req.json();

    await prisma.user.create({
        data: {
            username: detail.username,
            password: detail.password
        }
    })
    

    return NextResponse.json({
        message: "You successfully Signed up"
    })
}