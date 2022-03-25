
// connexion à la bdd
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://allUser:fuLPFQQiZMDtH3VM@cluster0.6hn6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'myFirstDatabase';

const client = new MongoClient(url);


function errorEmail(){
    let emailInput = document.querySelector(".email")
    let emailError = document.querySelector(".email-error")
    
    let inputEmail = document.querySelector("#floatingInput");
    let inputEmailError = document.querySelector("#floatingInputInvalid")

    inputEmail.value = ""
    inputEmailError.value = ""
    emailInput.setAttribute("hidden", "")
    emailError.removeAttribute("hidden")

}

function validEmail(){
    let emailInput = document.querySelector(".email")
    let emailError = document.querySelector(".email-error")

    let inputEmailError = document.querySelector("#floatingInputInvalid")
    inputEmailError.value = ""

    emailError.setAttribute("hidden", "")
    emailInput.removeAttribute("hidden")    

}

function validEmailError(){
    let emailInput = document.querySelector(".email")
    let emailError = document.querySelector(".email-error")

    let inputEmail = document.querySelector("#floatingInput");
    inputEmail.value = ""

    emailError.setAttribute("hidden", "")
    emailInput.removeAttribute("hidden") 

}

function getEmail(){
    var email = document.querySelector(".form-control#floatingInput")
    var email_error = document.querySelector(".is-invalid#floatingInputInvalid")
    
    if (!validerEmail(email.value)){
        if (!validerEmail(email_error.value)){
            errorEmail();
            return
        } else {
            validEmailError();
            return email_error
        }
    } else {
        validEmail();
    }

    return email
}

function validerEmail(email) {
    var re = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
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
