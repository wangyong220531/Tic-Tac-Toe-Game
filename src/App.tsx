/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import "./App.css"

interface SquareProps {
    value: string
    onSquareClick: () => void
}

function Square(props: SquareProps) {
    const { value, onSquareClick } = props

    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}

export default function Board() {
    const [isNext, setIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))

    function handleClick(index: number) {
        const nextSquares = squares.slice()
        if(nextSquares[index]) return
        isNext ? (nextSquares[index] = "X") : (nextSquares[index] = "O")
        setSquares(nextSquares)
        setIsNext(!isNext)
    }
    return (
        <div className="board">
            {squares.map((e: string, index: number) => {
                return <Square value={e} onSquareClick={() => handleClick(index)} />
            })}
        </div>
    )
}
