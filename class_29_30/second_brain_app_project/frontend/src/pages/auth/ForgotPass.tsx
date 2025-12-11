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

const handleForgotPass = async (username: HTMLInputElement, navigate: NavigateFunction) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/forgotpass`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
      }),
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    console.log(data);
    alert(data.message);
    navigate("/login");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};



export function FotgotPassPage() {

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your username
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={()=>navigate("/auth/login")}>Login</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="text">username</Label>
              <Input
                id="text"
                type="text"
                placeholder="cooldude"
                required
                ref={usernameRef}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md" onClick={() => handleForgotPass(usernameRef.current!, navigate)}>
          Forgot Password
        </Button>
      </CardFooter>
    </Card>
  )
}
