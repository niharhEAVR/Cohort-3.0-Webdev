function setTimeoutPromisified(milliSec) {
    return new Promise((resolve,reject)=> setTimeout(resolve,milliSec))
}

(async()=>{
    await setTimeoutPromisified(1000)
    console.log('Hi')
    await setTimeoutPromisified(3000)
    console.log('Hello')
    await setTimeoutPromisified(5000)
    console.log('Hello there...')
})()