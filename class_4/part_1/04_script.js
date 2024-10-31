// this is another method of setTimeout
// first it will wait 3 second then it will print the callback function
function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
  console.log("3 seconds have passed thats why this got printed");
}

setTimeoutPromisified(3000).then(callback)