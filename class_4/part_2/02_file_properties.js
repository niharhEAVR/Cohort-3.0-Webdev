// this is the better way of accessing the file 

const fs = require("fs");

function cleanFile(initialFilePath, trimmedFilePath) {
    return new Promise( resolve => {
        fs.readFile(initialFilePath, "utf-8",  (err, data) =>{
            data = data.trim();
            fs.writeFile(trimmedFilePath, data,  ()=> {
                resolve();
            });
        });
    });
}

async function main() {
    await cleanFile("02_initial.txt", "02_after_trim.txt");
    console.log("Done cleaning file");
}

main();