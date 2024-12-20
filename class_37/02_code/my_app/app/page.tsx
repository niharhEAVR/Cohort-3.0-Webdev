import axios from "axios";

export default async function App() {

    const response = await axios.get("http://localhost:3000/api/users")

    const data = response.data

    return (
        <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {data?.name}
                </div>
                
                {data?.email}
            </div>
        </div>
    </div>
    );
}