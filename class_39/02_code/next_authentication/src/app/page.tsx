"use client"

import { useSession,SessionProvider } from "next-auth/react";
import Link from "next/link";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Home {...pageProps} />
    </SessionProvider>
  )
}

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));


  const session = useSession();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <Link href={"/api/auth/signin"} className="border rounded-xl hover:bg-slate-900 p-3">Auth Page</Link>
      <Link href={"/customLogin"} className="border rounded-xl hover:bg-slate-900 p-3">Custom login page</Link>
    </div>
  );
}
