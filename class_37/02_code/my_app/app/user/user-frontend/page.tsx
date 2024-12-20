"use client";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://api.github.com/users/Nihar-Debnath")
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* @ts-ignore */}
            {data.html_url} <br />
            {/* @ts-ignore */}
            {data.name}
        </div>
    );
}

// The issue with this code is that its still using the waterfalling problem

// because if you go to the network tab then you will get to see that there is only Loading... is coming on the \user get request response

// after the \user there is (another get request is coming from the https://api.github.com/users/Nihar-Debnath)  which is returning the details

// so this is not the actual use of Nextjs code (because nextjs is uses for the ssr means nextjs server will call the backend and give us only one request along with the details), we dont have to manually do this things