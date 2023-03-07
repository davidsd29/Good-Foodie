import { GetRouter } from "../router.js";

const login = {
    email: document.getElementById("login-email"),
    psw: document.getElementById("login-psw"),
}

const navigation = {
    home: document.getElementById("nav-home"),
    card: document.getElementById("nav-card"),
    list: document.getElementById("nav-list"),
}

const nameTitle = document.getElementById("name-title");
const shoppingCradAccept = document.querySelector("#shopping-card a")

function SetNavigation (id, name) {
    navigation.home.setAttribute("href", `#id=${id}&${name}/#home`);
    navigation.card.setAttribute("href", `#id=${id}&${name}/#shopping-card`);
    navigation.list.setAttribute("href", `#id=${id}&${name}/#shopping-list`);
    navigation.list.setAttribute("href", `#id=${id}&${name}/#shopping-list`);
    shoppingCradAccept.setAttribute("href", `#id=${id}&${name}/#shopping-card`);
}

function CheckLogin(event) {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      console.log("Please make an account");
    } else {
        users.forEach(user => {
            if (login.email.value === user.email && login.psw.value === user.psw) {
                console.log("user exist log in succesful")
                const userIndex = users.indexOf(user);
                console.log(userIndex);
                
                window.location.hash = `#id=${userIndex}&${user.name}/#home`;
                nameTitle.textContent = `Welcome ${user.name}`;
                SetNavigation(userIndex, user.name)

            } else if (login.email.value === user.email && login.psw.value !== user.pws) {
                console.log("wrong email or passwoord. please try again")
            }           
        });
    }
}

export { CheckLogin }