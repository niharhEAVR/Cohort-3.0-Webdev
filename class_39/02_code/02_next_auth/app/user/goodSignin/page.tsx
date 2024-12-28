import { getServerSession } from "next-auth";

export default async function Home() {

    const session = await getServerSession()

    return (
        <div className="text-blue-400">
            {JSON.stringify(session)}
        </div>
    );
}


// when you will go to the network tab then you will see the first request is containing the null value in the previews there us no other request is going for the session, but in useSession there is a another request is also going on the session for the authentication