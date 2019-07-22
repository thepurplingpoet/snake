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
       this.startGame()
     }, SPEED);
  }
  state = {
    direction: RIGHT,
    snakePos: [[0, 0]],
    foodPos: [250, 250],
    game: "ON"
  };

  startGame = () => {
    this.elongateSnake();
    this.moveSnake();
  }

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

      //logic to restrict snake movement within game area
      if(snakeMouth[0]>475 || snakeMouth[0]<0 || snakeMouth[1]>475 || snakeMouth[1]<0 ){
        return {game:"OVER"}
      }
      //logic to not allow snake to overlap with its own snakeBody

      
      snakeBody.push(snakeMouth);
      snakeBody.shift();
      return {
        snakePos: snakeBody
      };
    });
  };

  elongateSnake = ()=> { 
    let snakeBody = [...this.state.snakePos];
    let snakeMouth = snakeBody[snakeBody.length-1];
    if(snakeMouth[0]===this.state.foodPos[0] && snakeMouth[1]===this.state.foodPos[1]){
      snakeBody.push(this.state.foodPos);
      this.setState({
        snakePos: snakeBody,
        foodPos: this.getNewFoodPos()
      })
    }
    
  }

  getNewFoodPos = () => {
    let x = Math.random() * 475;
    let y = Math.random() * 475;

    return [x - x%25,y - y%25]
  }

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
      {this.state.snakePos.map((sp, i) => {
        return <div className="snake" key = {i}
                style={{
                  top: sp[0],
                  left: sp[1]
                }}
                ></div>
      })}
        
        <div
          className="food"
          style={{
            top: this.state.foodPos[0],
            left: this.state.foodPos[1]
          }}
        >
          {" "}
        </div>
      </div>
    );
  }
}

export default Game;
