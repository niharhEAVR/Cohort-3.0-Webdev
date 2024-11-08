const jwt = require('jsonwebtoken');
const JWT_Secret = "secret"

function verifiedJWT(signature) {
    const responseJWT = jwt.verify(signature, JWT_Secret);
    if(responseJWT) {
        return true;
    } else {
        return false;
    }
}

const Signature = "uhofho0h3ofh0i3h0ifh0pihfih3";
const response = verifiedJWT(Signature);
console.log(response);



// thats why we should use try and catch