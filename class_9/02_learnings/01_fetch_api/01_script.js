(async ()=>{
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    let data = await response.json()
    let user_name = data.name
    let company_name = data.company.name
    document.querySelector(".posts").innerHTML = `Dummy API call user's name = ${user_name} <br> Company name = ${company_name}`
})()