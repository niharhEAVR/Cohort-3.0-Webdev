import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.create({
    data: {
      email,
      password, // hash later
    },
  });

  return NextResponse.json(user);
}
