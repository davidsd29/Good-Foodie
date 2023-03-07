import {scan, popUp} from './variable.js';

const camera = {
     scanner: new Html5Qrcode("scanner"),
     frame: document.getElementById("camera")
}

let camIsLoading = true;

const fileCodeReader = new Html5Qrcode("reader");
const errorText = document.getElementById("error-text");

// Start scanning of the camera for product
function StartCameraScan (type) {
    CheckLoadingState();
    camera.frame.classList.remove("hidden");

    // Set delay on appearance of stopscan button
    setTimeout(function() {scan.stop.style.display = "block";}, 1400);

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (barcode) => {

        const hash = window.location.hash; // Get the hash from the URL
        const linkParts = hash.split('/'); // Split the hash into an array of parts

        StopCameraScan();
        
        // Set data in URL; 
        if( type === "product"){
            window.location.hash = `${linkParts[0]}/#product/${barcode}`;
        } else {
            window.location.hash = `${linkParts[0]}/#shopping-card/${barcode}`;
        }
    };

    camIsLoading = false;
    
    camera.scanner
    .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
    .catch((err) => {
        setTimeout(function() {scan.stop.style.display = "none";}, 1400);

        // action sap
        // let barcode = 8718858613977;

        // vitamine water
        let barcode = 8715600243949;

        // AA
        // let barcode = 87365290;

        // Energy
        // let barcode = 8710624030667;

        const hash = window.location.hash; // Get the hash from the URL
        const linkParts = hash.split('/'); // Split the hash into an array of parts
        window.location.hash = `${linkParts[0]}/#product/${barcode}`;


        // DisplayErrorPopUp(err);
    });
}


// Stops scanning of the camera
function StopCameraScan() {
    camera.scanner.stop().then((ignore) => {
        camera.frame.classList.add("hidden");
        scan.stop.style.display = "none";
        // QR Code scanning is stopped.
        // Clears scanning instance. Stops the camera
        camera.scanner.clear();
        
        // Removes reader element from DOM since no longer needed
        // document.getElementById("scanner").remove();
    })
    .catch((err) => {
        // Stop failed, handle it.
        console.log(err);
    });
}


function GetFileBarcode(event) {
    popUp.scan.classList.remove("open");
    
    if (event.target.files.length == 0) {
        DisplayErrorPopUp("no file found");
        return;
    }
    
    const imageFile = event.target.files[0];
    
    // Scan QR Code
    fileCodeReader.scanFile(imageFile, true)
    .then(barcode => {
        // barcode succes = true
        const hash = window.location.hash; // Get the hash from the URL
        const linkParts = hash.split('/'); // Split the hash into an array of parts

        window.location.hash = `${linkParts[0]}/#product/${barcode}`;
        fileCodeReader.clear();
    })
    .catch(err => {
        fileCodeReader.clear();
        DisplayErrorPopUp(err);
        console.log(`Error scanning file. Reason: ${err}`)
    });
}


function CheckLoadingState() {
    if (camIsLoading) {
        console.log("loading");
    } else console.log(" not loading");
}


function DisplayErrorPopUp(errorMessage) {
    if (!camera.frame.classList.contains("hidden")) {camera.frame.classList.add("hidden");}
    popUp.error.classList.add("open");
    errorText.textContent = errorMessage;
}

export { StartCameraScan, StopCameraScan, GetFileBarcode };