import axios from "axios";

export default async function Home() {

  const userData = await axios.get("http://localhost:3000/api/v1/user/details")

  return (
    <>
    {userData.data.name}
    </>
  );
}
