import React, { Component } from "react";
import "./App.css";

const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const MOVER = 2;
class Game extends Component {
  componentDidMount() {
    this.moveSnake();
    this.moveSnake();
    this.moveSnake();
    this.moveSnake();
    this.moveSnake();
    this.moveSnake();
    this.moveSnake();
    this.moveSnake();

    document.onkeypress = this.handleKeyPress;
  }
  state = {
    direction: "RIGHT",
    snakePos: [[0, 0]],
    foodPos: [[15, 15]]
  };

  moveSnake = () => {
    this.setState(prevState => {
      let snakeBody = [...prevState.snakePos];
      let snakeMouth = snakeBody[snakeBody.length - 1];

      switch (prevState.direction) {
        case LEFT:
          snakeMouth = [snakeMouth[0] - MOVER, snakeMouth[1]];
          break;
        case UP:
          snakeMouth = [snakeMouth[0], snakeMouth[1] - MOVER];
          break;
        case RIGHT:
          snakeMouth = [snakeMouth[0] + MOVER, snakeMouth[1]];
          break;
        case DOWN:
          snakeMouth = [snakeMouth[0], snakeMouth[1] + MOVER];
          break;
        default:
          return prevState;
      }
      snakeBody.push(snakeMouth);
      snakeBody.shift();
      return {
        snakePos: snakeBody
      };
    });
  };

  handleKeyPress = e => {
    //TODO: condition for checking prevstate
    this.moveSnake();
    switch (e.keyCode) {
      case 37:
        this.setState({
          direction: LEFT
        });
        break;
      case 38:
        this.setState({
          direction: UP
        });
        break;
      case 39:
        this.setState({
          direction: RIGHT
        });
        break;
      case 40:
        this.setState({
          direction: DOWN
        });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className="box">
        <div
          className="snake"
          style={{
            top: this.state.snakePos[0][0],
            left: this.state.snakePos[0][1]
          }}
        >
          {" "}
        </div>{" "}
        <div
          className="food"
          style={{
            top: 250,
            left: 250
          }}
        >
          {" "}
        </div>
      </div>
    );
  }
}

export default Game;
