import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

//ксласс карты, который возвращает на игровое поле 4 карточки
class Card extends React.Component {
  render() {
    return (
      <li
        className={this.props.className} //получаем через пропсы название класса
        onClick={() => {
          this.props.onClick(); //добавляем каждой карточке слушатель события
        }}
      ></li>
    );
  }
}
//класс с основным игровым полем, который возвращает строку статуса и сами игровые карточки
class Board extends React.Component {
  //игровое поле содержит все состояния и контролирует отображение карточек
  constructor(props) {
    super(props);
    this.state = {
      cards: ["closed", "closed", "closed", "closed"],
      status: "Добро пожаловать! Выберите карту.",
      red: 0,
      green: 0,
    };
  }
  //метод генерирующий отдельно каждую карточку с ее индивидуальным классом и слушателем события
  renderCard(i) {
    return (
      <Card className={this.state.cards[i]} onClick={() => this.openCard(i)} />
    );
  }
  //метод с основной логикой игры
  openCard(i) {
    let random = Math.round(Math.random());
    const card = this.state.cards.slice();
    //проверка, позволяющая в случае проигрыша останавливать игру, не давая возможность открывать карты
    if (this.state.red === 1 && this.state.green === 1) {
      return;
    }
    //не позволяет открыть уже открытую карту
    if (card[i] === "red-card" || card[i] === "green-card") {
      this.setState({
        status: "Эта карта уже открыта! Вы не можете ее открыть!",
      });
      return;
    }
    //проверка, открывающая карту и изменющая состояник игрового поля
    if (random === 0 && this.state.red < 2) {
      this.setState({ red: this.state.red + 1 });
      card[i] = "red-card";
      this.setState({ cards: card });
      this.setState({
        status: "Вы открыли красную карту. Выберите следующую.",
      });
    } else if (random === 1 && this.state.green < 2) {
      this.setState({ green: this.state.green + 1 });
      card[i] = "green-card";
      this.setState({ cards: card });
      this.setState({
        status: "Вы открыли зеленую карту. Выберите следующую.",
      });
    } else this.openCard(i);
  }

  render() {
    //финальная проверка на выигрыш или поражение
    let status = this.state.status;
    if (this.state.red === 1 && this.state.green === 1) {
      status = "Вы проиграли.";
    } else if (this.state.red === 2 && this.state.green === 2) {
      status = "Вы выиграли! Поздравляю!";
    }

    return (
      <>
        <h1 className="status">{status}</h1>
        <ul className="board-row">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
        </ul>
      </>
    );
  }
}

//создаем класс Game который возвращает див с классом контейнер, который содержит класс с игровым полем
class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <Board />
      </div>
    );
  }
}

//Получаем элемент с ID root и рендерим туда класс Game
ReactDOM.render(<Game />, document.getElementById("root"));
