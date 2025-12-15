import Link from "next/link";
import ISR from "@/components/isr";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center gap-4 flex-col">
        <Link href="dispense" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/dispense</Link>
        <Link href="signin" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/signin</Link>
        <Link href="signup" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/signup</Link>
        <Link href="users" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/users</Link>
        <Link href="dashboard" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/dashboard</Link>
        <Link href="04_dynamic/1" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/04_dynamic/1</Link>
        <Link href="05_slug/name/random/noob/pro/valorant/1" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/05_slug/1</Link>
        <Link href="06_slugger" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/06_slugger</Link>
        <Link href="07_hydration/bad" className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/07_hydration/bad</Link>
        <Link href="07_hydration/good" className="border p-3  rounded-xl font-bold hover:bg-slate-900 mb-3">http://localhost:3000/07_hydration/good</Link>
        
        <ISR/>

      </div>
    </>
  );
}
