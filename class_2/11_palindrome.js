{
    const num = 121;

    const checkPalindrome = palindromeChecker(num)

    function palindromeChecker(num) {
        const numArray = [...num.toString()].map(Number)
        const arrLen = numArray.length;

        for (let i = 0; i < Math.floor(arrLen / 2); i++) {
            if (numArray[i] !== numArray[arrLen - 1 - i]) {
                return false
            }
        }
        return true
    }

    if (checkPalindrome) {
        console.log(`yes ${num} is palindrome`)
    } else {
        console.log(`no ${num} is not palindrome`)
    }
}

{
    // using reverse method
    const num = 12321;

    const checkPalindrome = palindromeChecker(num)

    function palindromeChecker(num) {
        if (num < 0 || (num >= 0 && num <= 10)) {
            return false
        } else {
            const numArr = [...num.toString()].map(Number);
            const check = numArr.join('') === numArr.reverse().join('')
            return check
        }
    }
    if (checkPalindrome) {
        console.log(`yes ${num} is palindrome`)
    } else {
        console.log(`no ${num} is not palindrome`)
    }
}