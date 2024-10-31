// the both date() and map() is created by someone else and we are using it

const date = new Date()
console.log(date.getFullYear())
console.log(date.getMonth())
// there is more dot functions you can check later


// another method of normal object
const map = new Map()
map.set('firstName', 'nihar')
map.set('lastName', 'debnath')
map.set('age', 19)
console.log(map.get('firstName'))
console.log(map.get('lastName'))
console.log(map.get('age'))
console.log(map)