import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        name: "cooldude",
        email: "cooldude@coolmail.com",
        address:{
            city:"cooler",
            state:"air conditioner",
            pin:"69"
        }
    })
}

// visit the http://localhost:3000/api/v1/user/details
// then http://localhost:3000/