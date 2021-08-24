import './Visualizer.scss'
import React, { useEffect, useState } from 'react'

import Grid from '../Grid/Grid'

function Visualizer(props) {
	/**
	 * State
	 */
	const [grid, setGrid] = useState([])
    const [idCount, setIdCount] = useState(0)
    const [graph, setGraph] = useState([])

	/**
	 * On mount setup an initial grid
	 */
	useEffect(function initalSetup() {
		function createPossibleNode(row, column) {
			return {
				id: '',
				row: row,
				column: column,
				isActive: false,
			}
		}

		const possibleNodes = []
		for (let i = 0; i < 10; i++) {
            const columnPossibleNodes = []
			for (let j = 0; j < 10; j++) {
				columnPossibleNodes.push(createPossibleNode(i, j))
			}
            possibleNodes.push(columnPossibleNodes)
		}

        // console.log(possibleNodes)
		/**
		 * Modify state with initial setup
		 */
		setGrid(possibleNodes)
	}, [])

    /**
     * Event handlers
     */
    function handleClick(row, column) {
        /**
         * Modify isActive property
         */
        const newGrid = grid.slice()
        newGrid[row][column].isActive = true
        newGrid[row][column].id = idCount
        setIdCount(idCount + 1)
        setGrid(newGrid)

        /**
         * Recognize to be a vertex in the graph
         */
        setGraph([...graph, []])
    }

    return (
        <React.Fragment>
            <Grid grid={grid} handleClick={handleClick} />
        </React.Fragment>
    )
}

export default Visualizer