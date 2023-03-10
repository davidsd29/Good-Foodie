import {DisplayTaskCompletePopUp} from './storage-product.js';
import {popUp} from '../variable.js';

function SaveUser(user) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      localStorage.setItem("users", JSON.stringify([user]));
    } else {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

    }

    DisplayTaskCompletePopUp("Your acount has been made. You will be automatically redirected to the log in screen");

    setTimeout(() => {popUp.loading.classList.add("open")}, 2000);
    setTimeout(() => {
      popUp.loading.classList.remove("open")
      window.location.hash = "#login";
    }, 4000);
}

export {SaveUser}