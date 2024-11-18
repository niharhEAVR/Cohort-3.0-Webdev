{
    interface People {
        name: String;
        age: number;
        greet: () => String
        // greet(): String // we can write this both way
    }

    let person: People = {
        name: "cooldude",
        age: 12,
        greet: () => {
            return "hi"
        }
    }

    {
        class Manager implements People {
            name: String;
            age: number;
            extra: String;

            constructor(name: String, age: number, extra: String) {
                this.name = name;
                this.age = age;
                this.extra = extra
            }

            greet() {
                return `hello ${this.name}`
            }
        }

        const user = new Manager("jhon", 46, "Extra things")
        console.log(user.name, user.age, user.extra);
        console.log(user.greet());
    }
    {
        class Employee implements People {
            constructor(public name: String, public age: number, public extra: String) {
                // using public keyword we dont need to repeat that thing
                this.name = name;
                this.age = age;
                this.extra = extra
            }

            greet() {
                return `hello ${this.name}`
            }
        }
    }

}