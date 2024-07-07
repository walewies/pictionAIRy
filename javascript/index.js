function handleMotionEvent(event) {
    const x = event.accelerationIncludingGravity.x;
    const y = event.accelerationIncludingGravity.y;
    const z = event.accelerationIncludingGravity.z;
  
    // Do something awesome.
    console.log(x);
    console.log(y);
    comsole.log(z);
  }
  
window.addEventListener("devicemotion", handleMotionEvent, true);
  