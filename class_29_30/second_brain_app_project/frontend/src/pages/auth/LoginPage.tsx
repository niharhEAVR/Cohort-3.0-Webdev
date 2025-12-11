import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useNavigate, type NavigateFunction } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import { useBackendStore } from "@/store/backend.store"
import PassWordComponent from "@/components/createdUi/passwordInput"
import { useProfieStore } from "@/store/profile.store"



const handleLogin = async (username: HTMLInputElement, pass: HTMLInputElement, navigate: NavigateFunction, url: string, ves: string) => {

    try {
        const res = await fetch(`${url}/${ves}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username.value,
                password: pass.value
            }),
        });

        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!data) throw new Error("Check username or password")
        console.log(data);
        localStorage.setItem("token", data.token);
        alert(data.token);
        useAuthStore.getState().login(data.token);
        useProfieStore.getState().setUsername(data.username)
        navigate("/dashboard");
    } catch (error) {
        console.error("Error logging in:", error);
    }
};



export function LoginPage() {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const { VITE_BACKEND_URL, VITE_BACKEND_URL_VERSIONS } = useBackendStore();


    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your username below to login to your account.
                </CardDescription>
                <CardAction>
                    <Button variant="link" onClick={() => { navigate("/auth/signup") }}>Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Username</Label>
                            <Input
                                id="text"
                                type="text"
                                placeholder="cooldude"
                                required
                                ref={usernameRef}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    onClick={() => navigate("/auth/forgotpass")}
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <PassWordComponent ref={passRef}/>
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md" onClick={() => handleLogin(usernameRef.current!, passRef.current!, navigate, VITE_BACKEND_URL, VITE_BACKEND_URL_VERSIONS)}>
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}
