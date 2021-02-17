import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class Card extends React.Component {
  render() {
    return (
      <li
        className={this.props.className}
        onClick={() => {
          this.props.onClick();
        }}
      ></li>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: ["closed", "closed", "closed", "closed"],
      status: "Добро пожаловать! Выберите карту.",
      red: 0,
      green: 0,
    };
  }

  renderCard(i) {
    return (
      <Card className={this.state.cards[i]} onClick={() => this.openCard(i)} />
    );
  }

  openCard(i) {
    let random = Math.round(Math.random());
    const card = this.state.cards.slice();

    if (card[i] === "red-card" || card[i] === "green-card") {
      this.setState({
        status: "Эта карта уже открыта! Вы не можете ее открыть!",
      });
      return;
    }

    if (random === 0 && this.state.red < 2) {
      this.setState({ red: this.state.red + 1 });
      card[i] = "red-card";
      this.setState({ cards: card });
      this.setState({
        status: "Вы открыли красную карту. Выберите следующую.",
      });
    } else if (random === 1 && this.state.green < 2) {
      this.setState({ red: this.state.green + 1 });
      card[i] = "green-card";
      this.setState({ cards: card });
      this.setState({
        status: "Вы открыли зеленую карту. Выберите следующую.",
      });
    } else this.openCard(i);

    if (this.state.red === 1 && this.state.green === 1) {
      card.map((e) => (e = "closed"));
      this.setState({ cards: card });
    } else if (this.state.red === 2 && this.state.green === 2) {
        this.setState({status: "Вы выиграли! Поздравляю!"});
    }
  }

  render() {
    return (
      <div>
        <h1 className="status">{this.state.status}</h1>
        <ul className="board-row">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
        </ul>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <Board />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
