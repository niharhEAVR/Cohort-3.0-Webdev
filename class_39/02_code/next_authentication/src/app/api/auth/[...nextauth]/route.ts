import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id:"1",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", style: "background-color:#FFF; color: #000;", placeholder: "password" }
            },
            async authorize(credentials, req) {

                const { username, password } = credentials!;
                if (!username) return null;

                const user = { id: "1", username: username }

                console.log(user);


                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),


        GoogleProvider({
            clientId: "process.env.GOOGLE_CLIENT_ID",
            clientSecret: "process.env.GOOGLE_CLIENT_SECRET"
        }),

        GitHubProvider({
            clientId: "process.env.GITHUB_ID",
            clientSecret: "process.env.GITHUB_SECRET"
        }),

        DiscordProvider({
            clientId: "process.env.DISCORD_CLIENT_ID",
            clientSecret: "process.env.DISCORD_CLIENT_SECRET"
        }),


        CredentialsProvider({
            id:"2",
            name: "Custom Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                mode: { label: "Mode", type: "hidden" }
            },

            async authorize(credentials, req) {
                if (!credentials) return null

                const { username, password, mode } = credentials
                console.log(username,mode);
                

                // FIND USER
                // const existingUser = db.users.find(u => u.email === email)

                // SIGNUP
                if (mode === "signup") {
                    // if (existingUser) return null

                    // const hashed = await bcrypt.hash(password, 10)

                    // const newUser = {
                    // id: String(users.length + 1),
                    // email,
                    // password: hashed
                    // }

                    return { id: "1", username: username } // Added id property
                }

                // LOGIN
                // if (!existingUser) return null

                // const valid = await bcrypt.compare(password, existingUser.password)
                // if (!valid) return null

                return { id: "1", username: username } // Added id property

            }
        }),








    ],

    // pages: {
    //     signIn: "/customLogin"
    // } // if you uncomment this then all the auth routes redirected for /customLogin


})

export { handler as GET, handler as POST }