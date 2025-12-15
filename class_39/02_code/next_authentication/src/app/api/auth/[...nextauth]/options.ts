import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

// import bcrypt
// import dbConnect
// import UserModel

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "cre1",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                const { username, password } = credentials!;
                /*
                try {
                    // here we  have to do DB work
                } catch (error) {
                    throw new Error();
                }
                */
                if (!username) return null;
                const user = { id: "1", username: username };

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],

    pages:{
        signIn:"/login"
    },
    session:{
        strategy:"jwt"
    },
    secret:"SECRET",




}