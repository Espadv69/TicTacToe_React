import { useState } from 'react' // Importamos cosas necesarias de React
import confetti from 'canvas-confetti' // Importamos confeti para usarlo si alguien gana

// Importamos nuestro componente 👇
import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'

// Importamos nuestras constantes que están fuera del componente principal 👇
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'


// Componente principal App
function App() {

  // Estado para el tablero de juego, inicialmente vacío
  const [board, setBoard] = useState(Array(9).fill(null))
  // Estado para el turno, inicialmente es el turno de 'X'
  const [turn, setTurn] = useState(TURNS.X)
  // Estado para ganador
  const [winner, setWinner] = useState(null) // null => No hay Ganador --- false => Empate

  // Función para resetear juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Función para actualizar el tablero y cambiar de turno
  const updateBoard = (index) => {

    // No actualizamos la posición si ya tiene algo
    if (board[index] || winner) return

    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinnerFrom(newBoard)
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

        <WinnerModal resetGame={resetGame} winner={winner} />
      
    </main>
  )
}

export default App // Exportamos el componente App para que pueda ser usado en otros archivos
