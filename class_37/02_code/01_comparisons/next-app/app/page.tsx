import axios from "axios";

async function getUserDetails() {
  await new Promise((r) => setTimeout(r, 5000))
  const response = await axios.get("https://api.github.com/users/Kirat")
  return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userData?.login}
          </div>

          {userData?.html_url}
      <h1>Open the network tab and ckeck & observe the html response</h1>

        </div>
      </div>
    </div>
  );
}