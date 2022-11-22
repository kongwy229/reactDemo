import React from 'react'
import './App.css'

/**
 * 格子 
 * 把目前的 Square 组件称做“受控组件”。
 * 在这种情况下，Board 组件完全控制了 Square 组件。
 */
// class Square extends React.Component {
//   render() {
//     return (
//       // 真实dom上的onClick才会触发事件
//       <button 
//         className="square"  
//         onClick={() => this.props.onClick()}
//         >
//         {this.props.value}
//       </button>
//     );
//   }
// }
//函数式组件
function Square(props){
  return(
      <button 
        className="square"  
        onClick={props.onClick}
        >
        {props.value}
      </button>
  )
}
/**
 * 棋盘
 */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Array(9).fill(null),
      xIsNext:true,
      winner:null
    }
  }

  handleClick(i){
    if(this.state.winner) return; //如果有赢家就直接返回不再继续游戏

    //使用 .slice() 函数对 squares 数组进行拷贝，而非直接修改现有的数组
    const v = this.state.value.slice();
    if(v[i] !== null) return;//保证只能赋值一次
    v[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      value:v,
      xIsNext:!this.state.xIsNext,
    },()=>{ // setState 回调函数可以获取更新后的数据
      //计算有没有赢家
      const winner = calculateWinner(this.state.value);
      if(winner){
        this.setState({
          winner:winner
        })
      }
    });
  }

  renderSquare(i) {
    return <Square 
    value={this.state.value[i]} 
    onClick={()=>this.handleClick(i)}/>;
    // 自定义组件上的onClick只是属性
  }

  render() {
    let status = null;
    if(this.state.winner){
      status = `赢家是${this.state.winner}`
    }else{
      status = `下一个${this.state.xIsNext ? 'X' : 'O'}`
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="box">
          {
            this.state.value.map((item,index)=>{
              return  <Square value={item} key={index} onClick={()=>this.handleClick(index)}/>
            })
          }
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/**
 * 游戏
*/
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:'X'
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(arr){
  const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i < win.length; i++){
    if(arr[win[i][0]] && arr[win[i][0]] === arr[win[i][1]] && arr[win[i][0]] === arr[win[i][2]]){
      return arr[win[i][0]];
    }
  }
  return null;
}
export default Game;
