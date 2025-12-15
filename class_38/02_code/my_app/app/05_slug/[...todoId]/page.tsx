import Link from "next/link";

export default async function Todopage({ params }: { params: Promise<{ todoId: string[] }> }) {
    const todo = (await params).todoId
    console.log(todo, typeof todo);


    const number: number = Math.ceil(Math.random() * 100);

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center gap-4 flex-col">
                slug page {todo} - {typeof todo}
                <Link href={`${number}`} className="border p-3  rounded-xl font-bold hover:bg-slate-900">http://localhost:3000/05_todo/randomNumber</Link>
            </div>
        </>
    );
}
