import React, { useReducer } from "react";
import Card from "./Card";

//функция содержащая основную логику игры
export default function Board() {
  const [state, dispatch] = useReducer(reducer, {
    cards: ["closed", "closed", "closed", "closed"],
    closedCards: [],
    status: "Добро пожаловать! Выберите карту."
  });
  //функция, проверяющая состояние карты и открывающая выбранную карту
  function openCard(i) {
    let newState = { ...state }; //создаем новый объект состояния, чтобы не мутировать state
    let card = [...newState.cards]; //создаем новый массив карточек, т.к. на массив внутри нового объекта newState все еще ссылается state
    //проверяем пустой ли массив с закрытыми картами, в случае если пустой генерируем карты
    if (state.closedCards.length === 0) {
      dispatch({ type: "setClosedCards" });
    }
    //не позволяет открыть уже открытую карту
    if (
      card[i.target.id] === "red-card" ||
      card[i.target.id] === "green-card"
    ) {
      dispatch({ type: "no-open" });
      return;
    }

    dispatch({ type: "open", id: i.target.id }); //открываем карту
    dispatch({ type: "check-win" }); //проверяем есть ли выигрыш
    dispatch({ type: "check-opened-cards" }); //проверка сколько и какие открыты карты, если открыты две разные - другие нельзя открыть
    setTimeout(() => {
      dispatch({ type: "lose" }); //так же если открыты две разные карты - через 3 сек они закрываются
    }, 3000);
  }

  //функция рендера списка карт
  function renderCard(i) {
    return <Card id={i} className={state.cards[i]} onClick={openCard} />;
  }

  return (
    <>
      <h1 className="status">{state.status}</h1>
      <ul className="board-row">
        {renderCard(0)}
        {renderCard(1)}
        {renderCard(2)}
        {renderCard(3)}
      </ul>
    </>
  );
}

function reducer(state, action) {
  let newState = { ...state };
  let card = [...newState.cards];
  let arrClosedCards = [...newState.closedCards];
  let redCard = card.filter((e) => e === "red-card"); //возвращаем массив красных карт
  let greenCard = card.filter((e) => e === "green-card"); //возвращаем массив зеленых карт

  switch (action.type) {
    //проверяем сколько и какие открыты карты
    case "check-opened-cards":
      if (redCard.length === 1 && greenCard.length === 1) {
        return {
          ...newState,
          cards: card.map((e) =>
            e === "closed" ? (e = "closed events-none") : e
          )
        };
      } else return state;
    //генерируем массив с 4мя картами, двух разных цветов
    case "setClosedCards":
      let red = 0;
      let green = 0;
      let j = 0;
      while (j <= 4) {
        j++;
        let random = Math.round(Math.random());
        if (random === 0 && red < 2) {
          red++;
          arrClosedCards.push("red-card");
        } else if (random === 1 && green < 2) {
          green++;
          arrClosedCards.push("green-card");
        } else if (arrClosedCards.length < 4 && (red === 2 || green === 2)) {
          j--;
        }
      }
      return {
        ...newState,
        closedCards: arrClosedCards
      };

    //говорим что нельзя открыть открытую карту
    case "no-open":
      return {
        ...newState,
        status: "Эта карта уже открыта! Вы не можете ее открыть!"
      };
    //закрываем все карты для начала новой игры
    case "lose":
      if (redCard.length === 1 && greenCard.length === 1) {
        card.map((e) => (e = e + " events-none"));
        return {
          ...newState,
          cards: card.map((e) => (e = "closed"))
        };
      } else return state;
    //сообщаем о победе
    case "check-win":
      if (!card.includes("closed")) {
        return {
          ...newState,
          status: "Вы выиграли! Поздравляю!"
        };
      } else {
        return state;
      }
    //по клику присваиваем элементу массива с картами, элемент с картой из сгенерированного массива соответствующего id карты номера
    case "open":
      card[action.id] = arrClosedCards[action.id];
      return {
        ...newState,
        cards: card
      };
    default:
      return state;
  }
}
