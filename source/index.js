
// connexion à la bdd
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://allUser:fuLPFQQiZMDtH3VM@cluster0.6hn6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'myFirstDatabase';

const client = new MongoClient(url);


function errorEmail(){
    let emailInput = document.querySelector(".email")
    let emailError = document.querySelector(".email-error")
    emailInput.value = ""
    emailError.value = ""

    emailInput.setAttribute("hidden", "")
    emailError.removeAttribute("hidden")

}

function validEmail(){
    let emailInput = document.querySelector(".email")
    let emailError = document.querySelector(".email-error")
    emailError.value = ""

    emailError.setAttribute("hidden", "")
    emailInput.removeAttribute("hidden")

}

function getEmail(){
    var email = document.querySelector("#floatingInput")
    if (!validerEmail(email.value)){
        errorEmail();
        return
    } else {
        validEmail();
    }

    return email
}

function validerEmail(email) {
    var re = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    return re.test(email)
}

function validerPassword(password){
    var strongRegex = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/);
    return strongRegex.test(password)
}

function getPassword(){
    var password = document.querySelector("#floatingPassword")

    if (!validerPassword(password)){
         
    }
    console.log(password.value)
    console.log(validerPassword(password.value))

    return password
}


function receiveID(){
    var email = getEmail();
    var password = getPassword();

    return [email, password];
}

function connexion_client(){
    let buttonConnexion = document.querySelector(".btn-connexion")

    buttonConnexion.addEventListener('click', function(){
        receiveID();
    })
}
