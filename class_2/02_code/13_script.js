document.querySelector('#submit').addEventListener('click',(e)=>{
    e.preventDefault()
    const capital = parseInt(document.getElementById('capital').value)
    const years = parseInt(document.getElementById('years').value)
    const interest = parseFloat(document.getElementById('interest').value)
    const isCompound = document.getElementById('checkbox').checked
    
    
    let result;
    if (isCompound) {
        result = capital *((1+(interest/100))**years) - capital
    }else{
        result = capital * (interest/100) *years
    }
    document.getElementById('resultBox').value = `${result.toFixed(2)}`
})