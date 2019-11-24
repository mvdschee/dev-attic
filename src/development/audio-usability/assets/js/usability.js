/*! usability.js - v1.0 - 2018-09-09
* Flamingos are pretty badass!
* Copyright (c) 2018 Max van der Schee; Licensed MIT */

// global variables
var height = document.body.clientHeight,
    width = document.body.clientWidth,
    audioFile = document.getElementById("audio-file");

// set audio options    
audioFile.volume = 0;         
audioFile.autoplay = true;
audioFile.loop = true;
audioFile.load();

// capture mouse events.
let handleMousemove = (event) => {
    handleVolume(event.x, (height - event.y));
};

// throttle eventlistener
let throttle = (func, delay) => {
    let prev = Date.now() - delay;
    
    return (...args) => {
        let current = Date.now();
        if (current - prev >= delay) {
            prev = current;
            func.apply(null, args);
        }
    }
};

// change volume based on mouse position
function handleVolume (mouseX, mouseY) {

    // Pythagorean theorem to calculate the distance to the object
    // and set the volume based on that value 
    let mousePosition = Math.sqrt(mouseY * mouseY + mouseX * mouseX),
    totalPlayfield = Math.sqrt(height * height + width * width),
    audioVolume = 1 - (mousePosition / totalPlayfield);
    
    audioFile.volume = audioVolume; 
}

// set eventlisteners
document.addEventListener('mousemove', throttle(handleMousemove, 400));

document.getElementById('stop-the-sound').addEventListener('click', function() {
    audioFile.muted = true;
}); 