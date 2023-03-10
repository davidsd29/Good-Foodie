const login = {
    email: document.getElementById("login-email"),
    psw: document.getElementById("login-psw"),
    errorText: document.getElementById("login-error-text"),
    inputError: document.getElementById("input-error"),
    registerBtn: document.querySelector("#login-pop-up a")
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
                const userIndex = users.indexOf(user);
                
                window.location.hash = `#id=${userIndex}&${user.name}/#home`;
                nameTitle.textContent = `Welcome ${user.name}`;
                SetNavigation(userIndex, user.name)

            } else if (login.email.value == user.email && login.psw.value !== user.psw) {
                login.errorText.textContent = "wrong email or passwoord. please try again";
            } else {
                login.errorText.textContent = "There is no user with this email. Please make an account by registering.";
                if(login.registerBtn.classList.contains("hidden")) login.registerBtn.classList.remove("hidden");
            }         
        });
    }
}

export { CheckLogin }