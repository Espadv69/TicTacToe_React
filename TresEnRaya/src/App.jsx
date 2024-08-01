import { useState } from 'react' // Importamos cosas necesarias de React
import confetti from 'canvas-confetti' // Importamos confeti para usarlo si alguien gana

// Importamos nuestro componente 👇
import { Square } from './Square.jsx'

// Definimos quiénes pueden jugar: 'X' y 'O'
const TURNS = { 
  X: 'x',
  O: 'o'
}

// Combos que se pueden hacer
const WINNER_COMBOS = [
  // Horizontales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Verticales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonales
  [0, 4, 8],
  [2, 4, 6],
]


// Componente principal App
function App() {

  // Estado para el tablero de juego, inicialmente vacío
  const [board, setBoard] = useState(Array(9).fill(null))
  // Estado para el turno, inicialmente es el turno de 'X'
  const [turn, setTurn] = useState(TURNS.X)
  // Estado para ganador
  const [winner, setWinner] = useState(null) // null => No hay Ganador --- false => Empate


  const checkWinner = (boardToCheck) => {

    // Revisamos todas las posiciones ganadoras para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] // 👈 Develvería X u O
      }
    }

    return null // Si no hay ganador
  }

  // Función para resetear juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Revisar si hay empate
  const checkEndGame = (newBoard) => {
    // Revisamos si hay un empate, si no hay más espacios vacíos en el tablero
    return newBoard.every((square) => square !== null)
  }


  // Función para actualizar el tablero y cambiar de turno
  const updateBoard = (index) => {

    // No actualizamos la posición si ya tiene algo
    if (board[index] || winner) return

    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)
  }

  return (
    <main className="board"> {/* Contenedor principal del juego */}
      <h2 className="board__h2">Tik Tak Toe</h2> {/* Título del juego */}
      <button
      onClick={resetGame}
      >
        Reiniciar juego
      </button>
      
      <section className="game"> {/* Sección del tablero de juego */}
        {
          board.map((square, index) => { 
            // Recorre cada espacio del tablero y crea un componente Square para cada uno
            return (
              <Square 
                key={index} // Clave única para cada cuadrado
                index={index} // Índice del cuadrado
                updateBoard={updateBoard} // Función para actualizar el tablero
              >
                { square /* Espacio para mostrar contenido del cuadrado */}
              </Square>
            )
          }) 
        }
      </section>
      
      <section className="turn"> {/* Sección para mostrar de quién es el turno */}
        {/* Cuadrado para mostrar si es el turno de 'X' */}
        <Square
          isSelected={turn === TURNS.X} // Resalta si es el turno de 'X'
        >
          {TURNS.X}
        </Square>
        {/* Cuadrado para mostrar si es el turno de 'O' */}
        <Square
          isSelected={turn === TURNS.O} // Resalta si es el turno de 'O'
        >
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className="text">

              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Ganó:'
                }
              </h2>

              <header className="win">
                {winner && <Square> {winner} </Square>}
              </header>

              <footer>
                <button
                onClick={resetGame}
                >
                  Empezar de nuevo
                </button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App // Exportamos el componente App para que pueda ser usado en otros archivos
