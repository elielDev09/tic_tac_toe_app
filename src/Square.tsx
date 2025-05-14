import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const StyleSquare = styled.button`
    width: 80px;
    height: 80px;
    background-color: white;
    border: 2px solid #555;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    
    

    &:hover {
        background-color: #f0f0f0;
    }
`

type SquareProps = {
    value: (string | null)
    onSquareClick: () => void
}

function Square( {value, onSquareClick }: SquareProps ){
    return (
        <StyleSquare onClick={onSquareClick}>
            {value}
        </StyleSquare>
    )
}

const StyleBoardRow = styled.div `
    display: flex;
    text-align: center;
`

type BoardProps = {
    xIsNext: boolean
    squares: (string | null)[]
    onPlay: (nextSquares: (string | null)[]) => void
}

function Board({xIsNext,squares,onPlay}: BoardProps ) {
    function handleClick(i: number){
        if (squares[i] || calculateWinner(squares)){
            return
        }
        const nextSquares = squares.slice()
        if (xIsNext) {
            nextSquares[i] = 'X'
        } else {
            nextSquares[i] = 'O'
        }
        onPlay(nextSquares)
    } 

    const winner = calculateWinner(squares)
    let status: string
    if (winner) {
        status = `Winner: ${winner}`
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`
    }

    return (
        <>
            <div>{status}</div>
            <StyleBoardRow>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </StyleBoardRow>
            <StyleBoardRow>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </StyleBoardRow>
            <StyleBoardRow>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </StyleBoardRow>
        </>
    )
  }

  export default function Game(){
    const [history,setHistory] = useState<(string | null)[][]>([Array(9).fill(null)])
    const [currentMove,setCurrentMove] = useState<number>(0)
    const xIsNext: boolean = currentMove % 2 === 0
    const currentSquares: (string | null)[] = history[currentMove]

    function handlePlay(nextSquares: (string | null)[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: number){
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description: string
        if (move > 0) {
            description = `Go to move # ${move}`
        } else {
            description = 'Go to game start'
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div>
            <div>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
  }

  function calculateWinner(squares:(string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }