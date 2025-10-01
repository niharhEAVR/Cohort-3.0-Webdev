// Q: Write a function that
// 1. Reads the contents of a file
// 2. Trims the extra space from the left and right
// 3. Writes it back to the file

const file = require('fs');


file.readFile("01_after_trim.txt", "utf-8", (err, content) => {
    if (content !== null) {
        file.truncate("01_after_trim.txt", 0, (err) => {
            if (err) throw err
        })
    }
    file.readFile("01_initial.txt", "utf-8", (err, content) => {
        data = content.trim()
        file.writeFile("01_after_trim.txt", `${data}`, () => {
            console.log('done')
        })
    })
})


// this code actually doing:
// first it clears the content inside a txt file then takes a different content from a diff txt file, trims it and writes in in the first txt file