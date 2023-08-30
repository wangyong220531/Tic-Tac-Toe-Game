import { useState } from "react"
import "./App.css"

interface SquareProps {
    value: string
}

function Square(props: SquareProps) {
    const { value } = props
    return <button className="square">{value}</button>
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    return (
        <div className="board">
            <Square value={squares[0]} />
            <Square value={squares[1]} />
            <Square value={squares[2]} />
            <Square value={squares[3]} />
            <Square value={squares[4]} />
            <Square value={squares[5]} />
            <Square value={squares[6]} />
            <Square value={squares[7]} />
            <Square value={squares[8]} />
        </div>
    )
}
