{
    const firstName: any = "nihar"

    function greet(firstName: string): void {
        console.log(`hello ${firstName}`)
    }

    greet(firstName)
}

{
    function isLegal(age: number): boolean {
        if (age < 18) {
            return false
        } else {
            return true
        }
    }
    const ans = isLegal(2)
    console.log(ans)
}


{
    function delayedCall(func: () => void) {
        setTimeout(func, 5000)
    }
    delayedCall(function log() {
        console.log("Hello there....")
    })
}

{
    function greet(user: {
        name: String,
        age: number
    }) {
        console.log(`hello ${user.name}`)
    }

    greet({
        name: "nihar",
        age: 19
    })
}