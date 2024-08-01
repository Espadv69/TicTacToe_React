import { useState } from 'react' // Importamos cosas necesarias de React
import './App.css' // Importamos estilos CSS

// Definimos quiénes pueden jugar: 'X' y 'O'
const TURNS = { 
  X: 'x',
  O: 'o'
}

// Componente Square representa un cuadrado en el tablero
const Square = ({ children, isSelected, updateBoard, index }) => { 
  const className = `square ${isSelected ? 'is-selected' : ''}` // Clase para resaltar el turno actual

  const handleClick = () => { // Cuando hacemos clic en un cuadrado
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}> {/* Llama a handleClick cuando se hace clic */}
      {children} {/* Muestra el contenido del cuadrado */}
    </div>
  )
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


  // Función para actualizar el tablero y cambiar de turno
  const updateBoard = (index) => {

    // No actualizamos la posición si ya tiene algo
    if (board[index]) return

    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)
  }

  return (
    <main className="board"> {/* Contenedor principal del juego */}
      <h2 className="board__h2">Tik Tak Toe</h2> {/* Título del juego */}
      
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
    </main>
  )
}

export default App // Exportamos el componente App para que pueda ser usado en otros archivos
