import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

export default function Home() {
  return (

    <div className="h-screen w-screen flex items-center justify-center">

      <div className=" h-120 w-100 bg-black border-2 rounded-lg shadow-md flex items-end justify-center gap-4 pb-3">
        <Input placeholder="Enter your email" className="p-1 rounded border-2" />
        <Button children="Click me" appName="web" className="border-2 p-1 rounded" />
      </div>
    </div>
  );
}
