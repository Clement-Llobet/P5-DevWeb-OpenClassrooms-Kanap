class Contact {
    constructor(name, surname, address, city, email) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    checkName(name) {
        name.length <= 2 ? undefined : name;
    }

    checkSurname(surname) {
        surname.length <= 2 ? undefined : surname;
    }

    checkEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        !regex.exec(email) ? undefined : email;
    }

    checkAddress(address) {
        address.length <= 2 ? undefined : address;
    }

    checkCity(city) {
        city.length <= 2 ? undefined : city;
    }
}

export default Contact;