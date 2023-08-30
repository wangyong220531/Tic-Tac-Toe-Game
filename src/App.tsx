/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from "react"
import "./App.css"

interface SquareProps {
    value: string | number
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

function caculateWinner(squares: string[] | number[]) {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

interface BoardProps {
    xIsNext: boolean
    squares: string[] | number[]
    onPlay: (nextSquares: string[] | number[]) => void
}

function Board(props: BoardProps) {
    const { xIsNext, squares, onPlay } = props

    function handleClick(index: number) {
        const nextSquares = squares.slice()
        if (squares[index] || caculateWinner(squares)) return
        xIsNext ? (nextSquares[index] = "X") : (nextSquares[index] = "O")
        onPlay(nextSquares)
    }

    const winner = caculateWinner(squares)
    let descriptionText
    if (winner) {
        descriptionText = "获胜者是：" + winner
    } else {
        descriptionText = "下一位玩家是：" + (xIsNext ? "X" : "O")
    }

    return (
        <Fragment>
            <div className="board">
                {squares.map((e: string | number, index: number) => {
                    return <Square value={e} onSquareClick={() => handleClick(index)} />
                })}
            </div>
            <div className="description">{descriptionText}</div>
        </Fragment>
    )
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentSquares = history[history.length - 1]

    function handlePlay(nextSquares: string[] | number[]) {
        setHistory([...history.slice(0, currentIndex + 1), nextSquares])
        setXIsNext(!xIsNext)
    }

    function jumpTo(index: number) {
        setCurrentIndex(index)
    }

    const moves = history.map((_, index) => {
        let description
        if (index > 0) {
            description = "Go to #" + index
        } else {
            description = "Go to start"
        }
        return (
            <li key={index}>
                <button onClick={() => jumpTo(index)}>{description}</button>
            </li>
        )
    })

    return (
        <Fragment>
            <div className="container">
                <div className="game">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </Fragment>
    )
}
