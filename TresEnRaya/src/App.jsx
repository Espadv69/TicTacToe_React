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

// Componente principal App
function App() {
  // Estado para el tablero de juego, inicialmente vacío
  const [board, setBoard] = useState(Array(9).fill(null))
  // Estado para el turno, inicialmente es el turno de 'X'
  const [turn, setTurn] = useState(TURNS.X)

  // Función para actualizar el tablero y cambiar de turno
  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X // Cambiamos el turno
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
