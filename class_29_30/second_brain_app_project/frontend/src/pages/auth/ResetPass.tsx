import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// The link should be
// https://localhost:5173/resetpass?token=7249ba86f7e084ba470f2f3dd22942ebed2789d947d8fa547c612a0ce47c1d73


import { useRef } from "react"
import { useNavigate, type NavigateFunction, useSearchParams } from "react-router-dom"

const handleForgotPass = async (passRef: HTMLInputElement, navigate: NavigateFunction,token:string|null) => {
  try {
    if(!token) throw new Error("Token is not there");
    const res = await fetch(`http://localhost:3000/api/v1/resetpass`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        newPassword: passRef.value
      }),
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    console.log(data);
    alert(data.message);
    navigate("/login");
  } catch (error) {
    alert("Wrong or Missing Link")
    console.error("Error logging in:", error);
  }
};


export function ResetPassPage() {
  const navigate = useNavigate();
  const passRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("Query token:", token," -- ", typeof token);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>New Password</CardTitle>
        <CardDescription>
          Enter your passwrod
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required placeholder="Cooldude@200" ref={passRef} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md" onClick={() => handleForgotPass(passRef.current!, navigate,token)}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}
