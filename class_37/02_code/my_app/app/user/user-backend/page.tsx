import axios from "axios";

export default async function Home() {

    const response = await axios.get("https://api.github.com/users/Nihar-Debnath")

    await new Promise (r=> setTimeout(r,1000))
    const data = response.data

    return (
        <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {data?.name}
                </div>
                
                {data?.html_url}
            </div>
        </div>
    </div>
    );
}

// after going to this endpoint open the network tab and you will get to see that there is only one request is coming along with the details, no other backend it hitting there

// go to the network then click on the /user-backend then click on the response then you will see there is loading.. and details all showing togather

// to know what is this page is for then read the 03_user-backend.md to understnad better
