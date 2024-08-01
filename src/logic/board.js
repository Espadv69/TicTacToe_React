import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {

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