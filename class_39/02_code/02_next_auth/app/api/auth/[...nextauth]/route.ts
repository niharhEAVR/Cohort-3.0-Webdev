// go to this page for more providers: https://next-auth.js.org/providers/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "$username$",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                return {
                    name: "cooldude",
                    id: "1",
                    email: "cooldude@coolmail.com"
                }
            },
        }),

        GoogleProvider({
            clientId: "oiewh",
            clientSecret: "oiewh"
        }),

        GitHubProvider({
            clientId: "oiewh",
            clientSecret: "oiewh"
        }),
        AppleProvider({
            clientId: "oiewh",
            clientSecret: "oiewh"
        })
    ],
    secret: "secret"
});

export const GET = handler;
export const POST = handler;
