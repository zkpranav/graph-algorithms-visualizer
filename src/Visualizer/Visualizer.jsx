import './Visualizer.scss'
import React, { useEffect, useState } from 'react'

import Grid from '../Grid/Grid'
import GraphController from '../GraphController/GraphController'

import {initializeAdjecencyMatrix} from '../algorithmInterface.js'

function Visualizer(props) {
	/**
	 * State
	 */
	const [grid, setGrid] = useState([])
    const [idCount, setIdCount] = useState(0)
    const [graph, setGraph] = useState([])
    const [controllerContext, setControllerContext] = useState('setVertices')

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

    /**
     * Toggle controllerContext 
     */
    function handleDone(e) {
        if (controllerContext == 'setVertices') {
            setControllerContext('setEdges')
            initializeAdjecencyMatrix(graph, setGraph)
        } else if (controllerContext == 'setEdges') {
            setControllerContext('done')
        } else if (controllerContext == 'done') {
            e.target.disabled = true
        }
    }

    /**
     * Handling changes in controller context by building the adjecency matrix
     */

    return (
        <React.Fragment>
            <Grid grid={grid} controllerContext={controllerContext} handleClick={handleClick} />
            <GraphController handleDone={handleDone} />
        </React.Fragment>
    )
}

export default Visualizer