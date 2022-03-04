class Contact {
    constructor(name, surname, address, city, email) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    displayInfo() {
        console.log("Nom : " + this.name + " || Prénom : " + this.surname + " || email : " + this.email);
        return [this.name, this.surname, this.address, this.city, this.email]
    }

    checkName(name) {
        if (name.length <= 2) {
            let promptNameResponse = alert("Votre nom doit avoir plus de 2 caractères. Veuillez réessayer.");
            return this.checkName(promptNameResponse)
        }
        return name
    }

    checkSurname(surname) {
        if (surname.length <= 2) {
            let promptSurnameResponse = alert("Votre prénom doit avoir plus de 2 caractères. Veuillez réessayer.");
            return this.checkSurname(promptSurnameResponse)
        }
        return surname
    }

    checkEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.exec(email)) {
            let promptEmailResponse = alert("Votre email n'est pas correct. Veuillez entrer un email valide. Veuillez réessayer.");
            return this.checkEmail(promptEmailResponse)
        }
        return email
    }

    checkAddress(address) {
        if (address.length <= 2) {
            let promptAddressResponse = alert("L'addresse renseignée n'est pas correcte. Veuillez réessayer.");
            return this.checkAddress(promptAddressResponse)
        }
        return address
    }

    checkCity(city) {
        if (city.length <= 2) {
            let promptCityResponse = alert("La ville renseignée n'est pas correcte. Veuillez réessayer.");
            return this.checkCity(promptCityResponse)
        }
        return city
    }
}

export default Contact;