const editForm = {
  name: document.getElementById("product-name"),
  savedImg: document.getElementById("saved-product-img"),
  img: document.getElementById("product-img").src,
  sugar: document.getElementById("product-sugar"),
  salt: document.getElementById("product-salt"),
  nutrition: document.getElementById("product-nutrition"),
  submit: document.getElementById("edit-submit")
};

const filter = {
    value: document.getElementById("filter-awnser"),
    title: document.querySelector("#shopping-list h3"),
}

const scan = {
    start: document.getElementById("start-camera-scan"),
    stop: document.getElementById("stop-camera-scan"),
    popup: document.getElementById("scan-toggle")
} 

const shoppingCard = {
  frame: document.getElementById("shopping-card"),
  button: document.querySelector("#shopping-card button"),
  invite: document.querySelector("#shopping-card >section:first-of-type"),
  card: document.querySelector("#shopping-card >section:last-of-type")
} 

const popUp = {
    error: document.getElementById("error-pop-up"),
    scan: document.getElementById("scan-pop-up"),
    start: document.getElementById("start-pop-up"),
    loading: document.getElementById("loading-pop-up"),
    registration: document.getElementById("registration-pop-up"),
    closeBtn: document.querySelectorAll(".close")
}

export{ editForm, filter, scan, shoppingCard, popUp }