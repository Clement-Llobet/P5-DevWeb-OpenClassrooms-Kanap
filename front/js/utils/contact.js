class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    checkLastname(inputValue) {
        const regex = /^[A-zÀ-ú\s\-]+$/i
        inputValue.length <= 2 || !inputValue.match(regex) ? this.lastName = undefined : this.lastName = inputValue;
    }

    checkFirstname(inputValue) {
        const regex = /^[A-zÀ-ú\s\-]+$/i
        inputValue.length <= 2 || !inputValue.match(regex) ? this.firstName = undefined : this.firstName = inputValue;
    }

    checkEmail(inputValue) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        !regex.exec(inputValue) ? this.email = undefined : this.email = inputValue;
    }

    checkAddress(inputValue) {
        inputValue.length <= 2 ? this.address = undefined : this.address = inputValue;
    }

    checkCity(inputValue) {
        const regex = /^[A-zÀ-ú\s\-]+$/i
        inputValue.length <= 2 || !inputValue.match(regex) ? this.city = undefined : this.city = inputValue;
    }
}

export default Contact;