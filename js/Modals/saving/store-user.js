import {DisplayTaskCompletePopUp} from './store-product.js';

function SaveUser(user) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      console.log("no users in de list");
      console.log(user)
      localStorage.setItem("users", JSON.stringify([user]));
    } else {
        users.push(user);
    }

    DisplayTaskCompletePopUp("Your acount has been made. You will be automatically redirected to the log in screen");
    setTimeout(function() {window.location.hash = "#login";}, 4000);
}

export {SaveUser}