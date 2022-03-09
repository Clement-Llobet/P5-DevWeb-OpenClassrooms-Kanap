class Contact {
    constructor(name, surname, address, city, email) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    checkName(inputValue) {
        const regex = /\d/;
        
        console.log(inputValue.contains(regex));
        inputValue.length <= 2 ? this.name = undefined : this.name = inputValue;
    }

    checkSurname(inputValue) {
        inputValue.length <= 2 ? this.surname = undefined : this.surname = inputValue;
    }

    checkEmail(inputValue) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        !regex.exec(inputValue) ? this.email = undefined : this.email = inputValue;
    }

    checkAddress(inputValue) {
        inputValue.length <= 2 ? this.address = undefined : this.address = inputValue;
    }

    checkCity(inputValue) {
        inputValue.length <= 2 ? this.city = undefined : this.city = inputValue;
    }
}

export default Contact;