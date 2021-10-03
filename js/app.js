var body = document.querySelector("body");

let rightdial = document.getElementById("rightdialogue");
let leftdial = document.getElementById("leftdialogue");

let play = document.getElementById("play");

var music = document.getElementById("music");
var musicpic = document.getElementById("musicpic");
musicpic.onclick = function () {
    music.play();
}

let index = 1;
document.getElementById("start").addEventListener("click", start);
let characters = document.getElementById("main");
let background = document.getElementById("everything");
function start() {
    characters.style.display = "flex";
    background.style.display = "none";
}
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
document.getElementById("main").addEventListener("click", nextChat);
function nextChat() {
    let texts = document.querySelectorAll("p");
    if (index % 2 !== 0) {
        rightdial.style.display = "flex";
        leftdial.style.display = "none";
        for (var i = 0; i < texts.length; i++) {
            texts[i].style.display = "none";

        }
        document.getElementById("text" + index).style.display = "inline-block";
    }
    else if (index % 2 === 0) {
        leftdial.style.display = "flex";
        rightdial.style.display = "none";
        for (var i = 0; i < texts.length; i++) {
            texts[i].style.display = "none";
        }
        document.getElementById("text" + index).style.display = "inline-block";
    }
    console.log(index);
    index++;
    if (index > 24) {
        characters.style.display = "none";
        play.style.display = "block";
    }
}

