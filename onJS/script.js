"use strict";

let closed = document.querySelectorAll(".closed");
let h1 = document.querySelector('h1');
let colorRed = ['red', 'red'];
let colorGreen = ['green', 'green'];
let red = 0;
let green = 0;
let i = 0;


for (let i of closed) {
    i.addEventListener('click', openCard);
}

function equal() {
   
}

//генерируем случайный цвет из двух по нажатию и проверяем что на поле не более двух одинаковых карт
function openCard(e) {
    let random = Math.round(Math.random());
    if(random === 0 && red < 2) {
        red++;
        openRedCard(e);
    } else if(random === 1 && green < 2) {
        green++;
        openGreenCard(e)
    } else openCard(e);
}
//открываем красную карту
function openRedCard(e) {
    e.target.classList.toggle('red-card');
}
//открываем зеленую карту
function openGreenCard(e) {
    e.target.classList.toggle('green-card');
}