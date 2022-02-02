fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        let array = data;
        console.log(array);
    })
    .catch(error => "L'erreur suivante est survenue : " + error)