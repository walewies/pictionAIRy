function handleMotionEvent(event) {
    const x = event.acceleration.x;
    const y = event.acceleration.y;
    const z = event.acceleration.z;

    document.getElementById("accX").textContent = x;
    document.getElementById("accY").textContent = y;
    document.getElementById("accZ").textContent = z;
}

function permission() {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then((response) => {
                if (response === "granted") {
                    window.addEventListener("devicemotion", handleMotionEvent);
                }
            })
            .catch(console.error);
    } else {
        alert("DeviceMotionEvent is not defined for this device");
    }
}

const btn = document.getElementById("request");
btn.addEventListener("click", permission);

window.addEventListener("devicemotion", handleMotionEvent, true);
