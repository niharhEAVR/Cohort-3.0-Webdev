import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen text-xl
     text-green-500 flex justify-center items-center">
      <div>
      <Link className="border p-1" href="/user/signin">Sign in</Link>
      <br />
      <br />
      <Link className="border p-1" href="/user/signup">Sign Up</Link>
      </div>
    </div>
  );
}
