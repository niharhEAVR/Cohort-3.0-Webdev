import { ExternalLink, CirclePlus } from "lucide-react"
import { Button } from "../ui/button"
import GElement from "../myOwn/GElement"


export default function Component() {
    return (<>
        <div className="h-screen w-screen bg-gray-700 flex justify-center items-center flex-col">
            <div className="border rounded border-amber-300 m-10">
                <h1 className="text-stone-50 text-xl text-center">These button are My own created Generic Components Button</h1>
                <GElement />
            </div>
            <div className="border rounded border-amber-300 m-10">
                <h1 className="text-stone-50 text-2xl text-center">These button are from the Shadcn/ui and Lucide-react</h1>
                <div className="h-30 w-auto flex gap-2 justify-center items-center m-2 p-3">

                    <Button variant={"outline"} size={"lg"} className="bg-amber-300 border-none hover:bg-amber-100"> <CirclePlus />Add Content</Button>
                    <Button variant={"outline"} size={"lg"} className="hover:bg-gray-300 border-none">Share <ExternalLink /></Button>
                    <Button variant={"outline"} className="bg-amber-300 border-none hover:bg-amber-100"> <CirclePlus />medium</Button>
                    <Button variant={"outline"} className="hover:bg-gray-300 border-none">medium <ExternalLink /></Button>
                    <Button variant={"outline"} size={"sm"} className="bg-amber-300 border-none hover:bg-amber-100"> <CirclePlus />Small</Button>
                    <Button variant={"outline"} size={"sm"} className="hover:bg-gray-300 border-none">Small
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div >
    </>)
}
