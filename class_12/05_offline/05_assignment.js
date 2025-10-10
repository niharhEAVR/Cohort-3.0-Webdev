// JWTs aassignment
// Write a function that takes in a username and password and returns a JWT token with the username encoded. Should return null if the username is not a valid email or if the password is less than 6 characters. Try using the zod library here
// Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified). Return false otherwise
// Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. Return false otherewise


const zod = require('zod') // read 05_notes.md
const jwt = require('jsonwebtoken')

const JWT_Secret = "cooldudes_secret"
const emailSchema = zod.string().email()
const passwordSchema = zod.string().min(6)


function generateToken(email, password) {
    const emailResponse = emailSchema.safeParse(email)
    const passwordResponse = passwordSchema.safeParse(password)

    if (!emailResponse.success || !passwordResponse.success) {
        return null
    } else {
        const Signature = jwt.sign({
            email
        }, JWT_Secret)
        return Signature
    }
}

const Signature = generateToken("cooldude@coolmail.com", "cooldude#69")
console.log(Signature);


function decodedJWT(signature) {
    const DECODED = jwt.decode(signature)
    console.log(DECODED);
    if (DECODED) {
        return true
    } else {
        return false
    }
}
const decodeOrNot = decodedJWT(Signature)



function verifiedJWT(signature) {
    
    try {
        const responseJWT = jwt.verify(signature, JWT_Secret)
        if(responseJWT.email === "cooldude@coolmail.com" ){
            return true
        }else{
            return false
        }
    } catch(error) {
        return error
    }
}


if (!decodeOrNot) {
    console.log("Cannot verify your signature")
} else {
    const response = verifiedJWT(Signature)
    console.log(response)
}