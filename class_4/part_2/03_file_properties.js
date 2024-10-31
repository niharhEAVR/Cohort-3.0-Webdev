{
    // another Promisified version of readFile and writeFile function 
    function readFilePromisified() {
        return new Promise(resolve => resolve)
    }


    const file = require("fs")
    function fileRead(filePath) {
        return new Promise(resolve => {
            file.readFile(filePath, "utf-8", (err, data) => {
                resolve(data.trim())
            })
        })
    }
    function fileWrite(filepath, data) {
        file.writeFile(filepath, data, () => console.log("done"))
    }
    readFilePromisified()
        .then(fileRead("03_initial.txt")
            .then(data => fileWrite("03_after_trim.txt", data)))
}