import React, { useState } from 'react'
import Square from './Square'
import Reset from './Reset'
// import './App.css'
import CurrentPlayer from './CurrentPlayer'
import { Button, Input, Label, Modal, ModalHeader } from "reactstrap"
import ModalComponent from "./ModalComponent"

import { click } from '@testing-library/user-event/dist/click'



const Game = () => {
  const [squares, setSquares] = useState([
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?"
  ])
  const [playerX, setPlayerX] = useState(" ")
  const [playerO, setPlayerO] = useState("")
  const handleChange = (e) => {
    setPlayerX(e.target.value)
  }
  const handleChangeO = (e) => {
    setPlayerO(e.target.value)
  }
  const playerTurn = () => {
    if (squares.filter((value) => value === "?").length % 2 !== 0) {
      return `${playerX}`
    }
    else if (squares.filter((value) => value === "?").length % 2 === 0) {
      return `${playerO}`
    }
  }
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  var updatedSquares = [...squares]
  //check for winning conditions
  const checkWinning = (array) => {
    var winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    //use a for loop to iterate all the nested varrays(winning combinations) from the 2d array 
    //then check if the 
    for (let i = 0; i < winningConditions.length; i++) {
      let parentArray = winningConditions[i]
      if (
        (
          (array[parentArray[0]] ===
            array[parentArray[1]]) &&
          (array[parentArray[1]] ===
            array[parentArray[2]])
        )
        &&
        (
          array[parentArray[0]] !== "?"
        )
      ) {
        alert(`Player ${array[parentArray[0]]} just won! Did you catch it?`);
        reset(); break
      }
      
    }
  }
  const reset = () => {
    console.log('reset')
    setSquares(["?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?"
    ])
  }
  const clickedSquare = (clickedIndex) => {
    if (updatedSquares.filter((value) => value === "?").length % 2 !== 0 && updatedSquares[clickedIndex] === "?") {
      updatedSquares[clickedIndex] = "X"
    }
    else if (updatedSquares.filter((value) => value === "?").length % 2 === 0 && updatedSquares[clickedIndex] === "?") {
      updatedSquares[clickedIndex] = "O"
    }
    else if (updatedSquares.filter((value) => value === "?").length === 0) { alert("Ooops no more squares...Hit restart to play again") }
    setSquares(updatedSquares)
  }

  return (
    <>
      <h1 className='title'>Tic Tac Toe</h1>
      <Reset
        reset={reset} />
        <br>
        </br>
      <div className="container" onClick={checkWinning(squares)}>
        {squares.map((value, index) => {
          return (
            <Square
              squares={value}
              index={index}
              key={index}
              clickedSquare={clickedSquare}
            />
          )
        })}
      </div>
      <div className="modal">
        <Button className="modal-button" color="primary" onClick={toggle}>
          START
        </Button>
        <ModalComponent modal={modal} toggle={toggle} playerX={playerX} playerO={playerO} handleChange={handleChange} handleChangeO={handleChangeO} />
        CurrentPlayer: {playerTurn()}
      </div>
      
    </>
  )
}

export default Game