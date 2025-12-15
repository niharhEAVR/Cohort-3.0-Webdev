"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
    const [mode, setMode] = useState<"login" | "signup">("login")

    async function handleSubmit(e: any) {
        e.preventDefault()

        const form = e.currentTarget

        const response = await signIn("credentials", {
            username: form.username.value,
            password: form.password.value,
            mode,
            callbackUrl: "/"
        })
        alert(response?.ok)
        console.log(response);
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded shadow w-96 space-y-4"
            >
                <h1 className="text-xl font-bold text-center">
                    Custom {mode === "login" ? "Login" : "Signup"}
                </h1>

                <input
                    name="username"
                    placeholder="Username"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                />

                <button className="w-full bg-black text-white p-2 rounded">
                    {mode === "login" ? "Login" : "Create Account"}
                </button>

                <p
                    className="text-sm text-center cursor-pointer underline"
                    onClick={() =>
                        setMode(mode === "login" ? "signup" : "login")
                    }
                >
                    {mode === "login"
                        ? "No account? Sign up"
                        : "Already have an account? Login"}
                </p>
            </form>
        </div>
    )
}
