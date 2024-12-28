import jwt from "jsonwebtoken"

import { NextResponse, NextRequest } from "next/server"

export async function POST(req:NextRequest) {
    const body = await req.json()

    const {username, password} = body


    const userId = 1

    const token = jwt.sign({
        userId
    },"Secret");

    return NextResponse.json({
        token
    })
}