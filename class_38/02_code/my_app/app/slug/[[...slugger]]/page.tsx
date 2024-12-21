export default async function Blogpage({ params }: any) {
    return (
        <>
            signin page {JSON.stringify((await params).slugger)}
        </>
    );
}
