const familyGroup = [
    {
        position: 'father',
        age: 45,
    },
    {
        position: 'mother',
        age: 38,
    },
    {
        position: 'uncle',
        age: 39,
    },
    {
        position: 'grandmother',
        age: 67,
    },
    {
        position: 'grandfather',
        age: 73,
    },
    {
        position: 'me',
        age: 19,
    },
    {
        position: 'my sister',
        age: 15,
    }
]
const oldestPerson = getOldestPerson(familyGroup)
function getOldestPerson(members) {
    return members.reduce((preV,curV)=> curV.age>preV.age?curV:preV)
}
console.log(oldestPerson)