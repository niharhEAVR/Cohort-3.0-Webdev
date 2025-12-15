
export default async function Home() {

    await new Promise((resolve) => setTimeout(resolve, 5000));

    return (
      <>
        bounty page (http://localhost:3000/dispense)
        <br />
        skips the (01_bounty) folder
      </>
    );
  }
  