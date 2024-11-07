document.getElementById('signup').addEventListener("click",async function(){
    const username = document.getElementById('usernameForSignup').value
    const password = document.getElementById('passwordForSignup').value
    

    try{
        const response = await axios.post("http://localhost:3000/signup",{
            username : username,
            password : password
        })

        alert(response.data.messege)
    }catch(error){
        const errorMessage = error.response?.data?.messege || error.message || "Unknown error";
        alert("Error During Signup: " + errorMessage);
    }
})

document.getElementById('signin').addEventListener("click", async()=>{
    const username = document.getElementById('usernameForSignin').value
    const password = document.getElementById('passwordForSignin').value


    try {
        const response = await axios.post("http://localhost:3000/signin",{
            username : username,
            password : password
        })
        console.log(`Your Token is: ${response.data.Token}`)
        alert(`${response.data.user} had signed in`)
    } catch (error) {
        const errorMessage = error.response?.data?.messege || error.message || "Unknown error";
        alert("Error During Signup: " + errorMessage);
    }
})