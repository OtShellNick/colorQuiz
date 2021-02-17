"use strict";

let closed = document.querySelectorAll(".closed");
let h1 = document.querySelector("h1");
let red = 0;
let green = 0;
//Функция запускает игру и слушатель событий на каждой из карточек
function startGame() {
  for (let i of closed) {
    i.addEventListener("click", openCard);
  }
}

function openCard(e) {
  let random = Math.round(Math.random());
  //проверяем не нажата ли карта повторно
  if (
    e.target.classList.contains("red-card") ||
    e.target.classList.contains("green-card")
  ) {
    h1.innerHTML = "Эта карта уже открыта! Вы не можете ее открыть!";
    startGame();
    return;
  }
  //подставляем по нажатию случайную карту
  if (random === 0 && red < 2) {
    red++;
    openRedCard(e);
    h1.innerHTML = "Вы открыли красную карту. Выберите следующую.";
  } else if (random === 1 && green < 2) {
    green++;
    openGreenCard(e);
    h1.innerHTML = "Вы открыли зеленую карту. Выберите следующую.";
  } else openCard(e);
  //проверяем выигрышная ли открыта комбинация или нет
  if (red === 1 && green === 1) {
    closedCard();
  } else if (red === 2 && green === 2) {
    h1.innerHTML = "Вы выиграли! Поздравляю!";
  }
}
//открываем красную карту
function openRedCard(e) {
  e.target.classList.toggle("red-card");
}
//открываем зеленую карту
function openGreenCard(e) {
  e.target.classList.toggle("green-card");
}
//в случае если открыты карты разного цвета - закрываем их
function closedCard() {
  h1.innerHTML = "Вы проиграли! Попробуйте еще раз!";
  setTimeout(() => {
    for (let i of closed) {
      if (i.classList.contains("red-card")) {
        i.classList.remove("red-card");
        red = 0;
      } else if (i.classList.contains("green-card")) {
        i.classList.remove("green-card");
        green = 0;
      }
    }
  }, 2000);
}

startGame();
