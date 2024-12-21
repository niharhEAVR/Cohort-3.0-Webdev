import axios from "axios";
export default async function Blogpage({ params }: any) {
    const postId = (await params).postId

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const data = response.data

    return (
        <>
            signin page {postId}
            <br />
            {data.title}
        </>
    );
}
