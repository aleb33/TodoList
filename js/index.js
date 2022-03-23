function getEmail(){
    var email = document.querySelector("#floatingInput")
    console.log(email.value)
    console.log(validerEmail(email.value))

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

    console.log(password.value)
    console.log(validerPassword(password.value))

    return password
}


function receiveID(){
    var email = getEmail();
    var password = getPassword();

    return [email, password];
}