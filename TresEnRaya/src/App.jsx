import { Children, useState } from 'react'
import './App.css'

const TURNS = { //Esta constante TURNS guarda quiénes pueden jugar: 'X' y 'O'. En un juego de tres en raya, los jugadores toman turnos usando 'X' o 'O'.
  X: 'x',
  O: 'o'
}

// const board = Array(9).fill(null) //Es un arreglo que tiene 9 espacios, todos inicializados con null. Representa nuestro tablero de tres en raya vacío.

const Square = ({ children, updateBoard, index }) => { //Aquí tenemos un componente llamado Square que representa un cuadrado del tablero de tres en raya.
  return (
    <div className="square">
      {children}
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  return (
    <main className="board">
      <h2>Hola mundo</h2>
      <section className="game">
        {
          board.map((_, index) => { {/* Este es un método que recorre cada espacio del tablero (9 en total) y crea un componente Square para cada uno. Usa index para identificar cada cuadrado. */}
            return (
              <Square 
                key={index}
                index={index}
              >
                
              </Square>
            )
          }) 
        }
      </section>
      <section className="turn">

        <Square
          isSelected={turn === TURNS.X}
        >
          {TURNS.X}
        </Square>

        <Square
          isSelected={turn === TURNS.O}
        >
          {TURNS.O}
        </Square>

      </section>
    </main>
  )
}

export default App
