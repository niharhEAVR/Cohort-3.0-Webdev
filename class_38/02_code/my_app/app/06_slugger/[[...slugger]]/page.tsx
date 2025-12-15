export default async function Blogpage({ params }: { params: Promise<{ slugger?: string[] }> }
) {

    const parameter = (await params).slugger;
    console.log(parameter, typeof parameter);


    return (
        <>
            slugger page {parameter === undefined ? "no parameter: undefined" : JSON.stringify(parameter)} - {typeof parameter}
        </>
    );
}
