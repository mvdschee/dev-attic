/*! atmosphere.scss - v1.0 - 2018-09-09
* Flamingos are pretty badass!
* Copyright (c) 2018 Max van der Schee; Licensed MIT */

// global variables
const observables = ['sky', 'snow', 'bike', 'ocean', 'next'];
let observers = [];

// start IntersectionObserver on page load
// to learn more about IntersectionObserver:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// 
startup();

function startup() {
    // Options for IntersectionObserver
    let observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Add each section, creating a new observer for each
    for (let i = 0; i < 5; i++) {
        observers[i] = new IntersectionObserver(intersectionCallback, observerOptions);
        observers[i].observe(document.querySelector('#' + observables[i]));
    }
}

// IntersectionObserver callback
function intersectionCallback(entries) {      
    entries.forEach(function (entry) {
        if (entry.intersectionRatio >= 0.1) {         
            audioHandler('audio-' + entry.target.id);
        } else {
            document.getElementById('audio-' + entry.target.id).volume = 0;
        }
    });
}

// set audio options    
function audioHandler(target) {   
    let audioFile = document.getElementById(target);

    audioFile.volume = 0.3;
    audioFile.autoplay = true;
    audioFile.loop = true;
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