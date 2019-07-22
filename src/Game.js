import React, { Component } from "react";
import "./App.css";

const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const MOVER = 25;
const SPEED = 300;

class Game extends Component {
  componentDidMount() {
    document.onkeydown = this.handleKeyPress;
     setInterval(() => {
       this.moveSnake()
     }, SPEED);
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
          snakeMouth = [snakeMouth[0], snakeMouth[1] - MOVER];
          break;
        case UP:
          snakeMouth = [snakeMouth[0] - MOVER, snakeMouth[1]];
          break;
        case RIGHT:
          snakeMouth = [snakeMouth[0], snakeMouth[1] + MOVER];
          break;
        case DOWN:
          snakeMouth = [snakeMouth[0] + MOVER, snakeMouth[1]];

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
    switch (e.keyCode) {
      case 37:
        this.setState(prevState =>{
          if(prevState.direction === UP || prevState.direction === DOWN)
          return {direction: LEFT}
        });
        break;
      case 38:
        this.setState(prevState =>{
          if(prevState.direction === LEFT || prevState.direction === RIGHT)
          return {direction: UP}
        });
        break;
      case 39:
        this.setState(prevState =>{
          if(prevState.direction === UP || prevState.direction === DOWN)
          return {direction: RIGHT}
        });
        break;
      case 40:
        this.setState(prevState =>{
          if(prevState.direction === LEFT || prevState.direction === RIGHT)
           return {direction: DOWN}
        });
        break;
      default:
        break;
    }
    this.moveSnake();
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
