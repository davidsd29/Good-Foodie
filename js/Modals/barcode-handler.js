import {scan, popUp} from './variable.js';

const camera = {
     scanner: new Html5Qrcode("scanner"),
     frame: document.getElementById("camera")

}

const fileCodeReader = new Html5Qrcode("reader");
const errorText = document.getElementById("error-text");


// Start scanning of the camera for product
function ScanProductBarcode () {
    camera.frame.classList.remove("hidden");
    // Set delay on appearance of stopscan button
    setTimeout(function() {scan.stop.style.display = "block";}, 1400);

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (barcode) => {
        // // return data; 
        StopCameraScan();
        window.location.hash = `#product/${barcode}`;
        GetRouter();
    };

    camera.scanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
    
    .catch((err) => {
        setTimeout(function() {scan.stop.style.display = "none";}, 1400);

        // action sap
        // let barcode = 8718858613977;

        // vitamine water
        // let barcode = 8715600243949;

        // AA
        // let barcode = 87365290;

        // Energy
        // let barcode = 8710624030667;
        // window.location.hash = `#product/${barcode}`;


        DisplayErrorPopUp(err);
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
    window.location.hash = `#product/${barcode}`;
    console.log(barcode);
    fileCodeReader.clear();
    
    })
    .catch(err => {
        fileCodeReader.clear();
        DisplayErrorPopUp(err);
        console.log(`Error scanning file. Reason: ${err}`)
    });
}

// Start scanning of the camera for card
function ScanCardBarcode() {
    camera.frame.classList.remove("hidden");
    // Set delay on appearance of stopscan button
    setTimeout(function() {scan.stop.style.display = "block";}, 1400);

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (barcode) => {
        // // return data; 
        StopCameraScan();
        window.location.hash = `#shopping-card/${barcode}`;
    };

    camera.scanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback).catch((err) => {
        setTimeout(function() {scan.stop.style.display = "none";}, 1400);
        DisplayErrorPopUp(err);
    });
}

function DisplayErrorPopUp(errorMessage) {
    if (!camera.frame.classList.contains("hidden")) {camera.frame.classList.add("hidden");}
    popUp.error.classList.add("open");
    errorText.textContent = errorMessage;
}

export { ScanProductBarcode, StopCameraScan, GetFileBarcode, ScanCardBarcode };