// Q: Write code that
// 1. logs hi after 1 second
// 2. logs hello 3 seconds after step 1
// 3. logs hello there 5 seconds after step 2

{
    setTimeout(() => {
        console.log('Hi')
        setTimeout(() => {
            console.log('Hello')
            setTimeout(() => {
                console.log('Hello there...')
            }, 5000)
        }, 3000)
    }, 1000)

    // callback hell
}

{
    function setTimeoutPromisified(milliSec) {
        return new Promise((resolve, reject) => setTimeout(resolve, milliSec))
    }

    setTimeoutPromisified(1000)
        .then(() => {
            console.log('Hi')
            return setTimeoutPromisified(3000)
        })
        .then(() => {
            console.log('Hello')
            return setTimeoutPromisified(5000)
        })
        .then(() => {
            console.log('Hello there...')
        })

    // setTimeout in Promisified method
}