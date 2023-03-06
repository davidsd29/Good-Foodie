import {SaveUser} from '../saving/store-user.js';

const registerForm = {
    formFields: document.querySelectorAll(".form-field"),
    name: document.getElementById("registration-name"),
    surname: document.getElementById("registration-surname"),
    email: document.getElementById("registration-email"),
    pws: document.getElementById("registration-psw"),
    pwsRepeat: document.getElementById("psw-repeat"),
    cancel: document.querySelector("registration-form a"),
    submit: document.getElementById("registration-sumbit")
}

const data = [];
let validRegistration = false;
let errorMessage;
let emailErrorMessage;

function CheckRegister(event) {
    event.preventDefault();

    //Looping through the whole form 
    registerForm.formFields.forEach((field) => {
            let input = field.querySelector("input"),
            name = input.name, //name of the input type
            value = input.value;

            errorResponse(name, value, field)

        data[name] = value
    });

    if (validRegistration) {
        SaveUser(data);
    } else {
        console.log("registration is not valid");
    }
}

function ValidatePws(input, check) {
    if (input === check.value && input.value !== "") {
        return true;
    } else {
        console.log("Passwaord did not match, please try again")
        return false;
    }
}
 

function ValidateEmail(input) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (input.match(validRegex) && input !== "") {

        // Check if email already exist
        if (users.length !== 0) {
            users.forEach(user => {
                if (input === user.email){
                    emailErrorMessage = "Email already exist, please try another one.";
                    return false;

                } else return true;
            });
        } 
        
    } else {
        emailErrorMessage = "E-mail adress is not valid, check for the @ or try again.";
        return false;
    }
}

function errorResponse(inputName, inputValue, required) {

    switch (inputName) { // Check which part of the hash we're dealing with
        case "name":
            if (inputValue === "") {
                validRegistration = false;
                required.classList.add("invalid");
                let message = GetErrorMessage("firstname");
                document.getElementsByName('name').placeholder = message;

            } else {
                validRegistration = true;
                required.classList.remove("invalid");
            }
            break;

        case "surname":
            if (inputValue === "") {
                validRegistration = false;
                required.classList.add("invalid");
                let message = GetErrorMessage("surname");
                document.getElementsByName('surname').placeholder = message;
                
            } else {
                validRegistration = true;
                required.classList.remove("invalid");
            }
            break;

        case "email":
            let validEmail = ValidateEmail(inputValue);
            let errorEmailInput = document.getElementById('error-email');
            
            if (inputValue === "" || (!validEmail)) {

                let message = GetErrorMessage("email");

                validRegistration = false;
                required.classList.add("invalid");

                if (!validEmail) {
                    errorEmailInput.style.display = "block";
                    errorEmailInput.textContent = emailErrorMessage;
                } else {
                    errorEmailInput.textContent = message;
                }

            } else {
                validRegistration = true;
                required.classList.remove("invalid");
                errorEmailInput.style.display = "none";
            }
            break;

        case "psw":
            let validPws = ValidatePws(inputValue, registerForm.pwsRepeat );
            let errorPwsInput = document.getElementById('error-pws');

            if (inputValue === "" || (!validPws)) {

                let message = GetErrorMessage("psw");

                validRegistration = false;
                required.classList.add("invalid");
                
                if (!validPws) {
                    errorPwsInput.style.display = "block";
                } else {
                    errorPwsInput.textContent = message;
                }

            } else {
                validRegistration = true;
                required.classList.remove("invalid");
                errorPwsInput.style.display = "none";
            }
            break;

        default:
            validRegistration = true;
    }
}


function GetErrorMessage(key){
    switch(key) {
        case 'firstname':
            errorMessage = 'Entry of first name is required';
            break;    
        case 'surname':
            errorMessage = 'Entry of surname is required';
            break;
        case 'email':
            errorMessage = 'Entry of e-mail is required';
            break;
        case 'psw':
            errorMessage = 'Entry of passwoord is required';
            break;

        default:
            errorMessage = "";         
    }

    return errorMessage; // The value of the array is been send back in to the errorMessage variable
}
export { CheckRegister }