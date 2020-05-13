module.exports = class User {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    getName() {
        return this.name;
    }

    getSurname() {
        return this.surname;
    }

    setName(value) {
        this.name = value;
    }

    setSurname(value) {
        this.surname = value;
    }
}