"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Roleplay/>
    </SessionProvider>
  );
}

function Roleplay() {
  const session = useSession();

  return(
    <div className="text-blue-400"> 
    {session.status === "unauthenticated" && <button className="text-green-300" onClick={()=> signIn()}>signin</button>}
    {session.status === "authenticated" && <button className="text-red-500" onClick={()=> signOut()}>Logout</button>}
    <br /> <br />
    {JSON.stringify(session)}
    </div>
  )
}
