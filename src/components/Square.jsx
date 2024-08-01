// Componente Square representa un cuadrado en el tablero
export const Square = ({ children, isSelected, updateBoard, index }) => { 
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