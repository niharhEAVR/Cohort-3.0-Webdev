import { Suspense } from "react";
import axios from "axios";
import AppLoader from "@/app/loading";

async function getUserDetails() {
  await new Promise((r) => setTimeout(r, 5000));
  const response = await axios.get(
    "https://api.github.com/users/Nihar-Debnath"
  );
  return response.data;
}

async function UserCard() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData.name}</div>
          <div>{userData.email ?? "No public email"}</div>
          <div>{userData.html_url}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<AppLoader />}>
      <UserCard />
      <h1>Open the network tab and ckeck & observe the html response</h1>
    </Suspense>
  );
}
