import React , {Component} from 'react';
import './App.css';


class Game extends Component {

 state = {
     snakePos : [
         [0,0]
     ],
     foodPos : [
         [15,15]
     ]
 }   
render(){
    return <div className = "box">
    <div className = "snake" style={{top:0, left:0}}></div>
    <div className = "food" style ={{top:250, left:250}}></div>

    </div>
}
}

export default Game;