/*! satisfaction.js - v1.0 - 2018-14-09
* Flamingos are pretty badass!
* Copyright (c) 2018 Max van der Schee; Licensed MIT */

// eventlistner for reload button
document.getElementById('js-data-trigger').addEventListener('click', (element) => {
    
    // set up variables
    const faxPaper = document.getElementById('paper'),
    loading = document.getElementById('js-data-loading');
    let pos = -100,
    id = setInterval(frame, 12);
    
    // disable reload button
    element.target.disabled = true;
    element.target.classList.add('disabled');

    // handler for audio
    audioHandler('js-audio-fax', false);

    // display loading animation
    loading.classList.add('show');

    // transform svg g element
    function frame() {
        if (pos == 0) {
            clearInterval(id);
            setTimeout(() => {
                pos = -100;
            }, 200);
            id = setInterval(frame, 12);
        } else {
            pos++;
            faxPaper.setAttribute('transform', 'translate(0, ' + pos + ')');
        }
    }

    // timeout to match audio file length
    setTimeout(() => {
        clearInterval(id);
        pos = -100;
        loading.classList.remove('show');
        element.target.disabled = false;
        element.target.classList.remove('disabled');
        document.getElementById('js-audio-fax').volume = 0;
    }, 5000);
}); 

// trigger for input of goal
document.getElementById('js-goal-input').addEventListener('input', (object) => {

    // play's audio if 2 charaters are filled in
    if (object.target.value.length === 2) {
        document.getElementById('js-goal-set').classList.add('show');
        audioHandler('js-audio-goal', false);
    } else {
        document.getElementById('js-goal-set').classList.remove('show');
    }

}); 

// eventlistner for sorting button
document.getElementById('js-sort-button').addEventListener('click', () => {

        // handler for audio
        audioHandler('js-audio-sort', false);

        // get all products with class and add/remove class
        document.querySelectorAll('.hide').forEach(element => {
            if (element.classList.contains("remove")){
                element.classList.remove('remove');
            } else {
                element.classList.add('remove');
            }
        });

}); 

// set audio options    
function audioHandler(target, loopValue) {
    let audioFile = document.getElementById(target);

    audioFile.volume = 0.3;
    audioFile.autoplay = true;
    audioFile.loop = loopValue;
    audioFile.load();
}

// smooth scrolling to element
function anchorLinkHandler(e) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

    e.preventDefault();
    const targetID = this.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);

    window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

    const checkIfDone = setInterval(function () {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = "-1";
            targetAnchor.focus();
            window.history.pushState("", "", targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}

const linksToAnchors = document.querySelectorAll('a[href^="#"]');

linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));
