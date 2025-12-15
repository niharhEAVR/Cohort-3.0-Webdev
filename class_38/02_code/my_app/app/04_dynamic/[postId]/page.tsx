import axios from "axios";
export default async function Blogpage({ params }: { params: Promise<{ postId: string }>}) {
    const postId = (await params).postId
    console.log(postId, typeof postId);


    if (Number(postId) <= 10 && Number(postId) > 0) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${Number(postId)}`)
        const data = response.data

        return (
            <>
                dynamic page {postId} - {typeof postId}
                <br /><br /><br />
                <div>
                    Fetched Data:{data.title}
                </div>
            </>
        );

    }

    return (
        <>
            dynamic page {postId} - {typeof postId}
        </>
    );
}
