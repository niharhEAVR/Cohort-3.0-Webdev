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

        localStorage.setItem("token", response.data.Token)
        // read 01_notes.md on notes folder
        


        alert(`${response.data.user} had signed in`)
        getUserInfo()
    } catch (error) {
        const errorMessage = error.response?.data?.messege || error.message || "Unknown error";
        alert("Error During Signup: " + errorMessage);
    }
})


async function getUserInfo() {
    const response = await axios.get("http://localhost:3000/dashboard",{
        headers: {
            token : localStorage.getItem("token")
        }
    })
    document.querySelector('.information').innerHTML = `Username: ${response.data.username} <br> Github: ${response.data.Github_URL} <br> Login Time: ${response.data.loginAt}`
}