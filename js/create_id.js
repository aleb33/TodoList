import {validerEmail, validerPassword, client, MongoClient, url, dbName} from "index.js"


function getEmail_sub(){
    var email = document.querySelector("#InputEmail")
    
    if (!validerEmail(email.value)){

    }



    return email
}


function getPassword_sub(){
    var password = document.querySelector("#InputPassword")
    var confirm_password = document.querySelector('#InputConfirmPassword')

    if (!validerPassword(password)){
         
    }
    if (password.value !== confirm_password.value){
        
    }


    return password
}


function receiveID_sub(){
    var email = getEmail_sub();
    var password = getPassword_sub();

    return [email, password];
}