import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        name: "cooldude",
        email: "cooldude@coolmail.com"
    })
}


// we created the backend with with nextjs and accessing it onto the root page element

// think this route.ts as an express backend server where we are taking details from our database and sending it to the root page.tsx

// now if you go to the postman and write the http://localhost:3000/api/users and make a get request you will see the output same as an express server