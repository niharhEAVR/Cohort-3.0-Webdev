(async()=>{
    let response = await axios.get("https://jsonplaceholder.typicode.com/users/1")

    document.querySelector(".posts").innerHTML = `Dummy user name: ${response.data.name}`
})()