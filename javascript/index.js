function handleMotionEvent(event) {
    const x = event.acceleration.x;
    const y = event.acceleration.y;
    const z = event.acceleration.z;
    
    // Do something awesome.
    document.getElementById("accX").textContent = x;
    document.getElementById("accY").textContent = y;
    document.getElementById("accZ").textContent = z;       
}

if ( location.protocol != "https:" ) {
    location.href = "https:" + window.location.href.substring( window.location.protocol.length );
}

function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener("devicemotion", handleMotionEvent)
            }
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined for this device" );
    }
}

let btn = document.getElementById("request");
btn.addEventListener("click", permission);

window.addEventListener("devicemotion", handleMotionEvent, true);