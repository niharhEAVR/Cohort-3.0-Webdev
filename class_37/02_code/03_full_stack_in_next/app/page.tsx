import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen text-xl
     text-green-500 flex justify-center items-center gap-3 flex-col">
      <Link className="border-2 p-3 rounded-2xl hover:bg-green-600 hover:text-black" href="/auth/signin">Sign In to your App</Link>
      <Link className="border-2 p-4 rounded-2xl hover:bg-green-600 hover:text-black" href="/auth/signup">Sign Up to your App</Link>
    </div>
  );
}
