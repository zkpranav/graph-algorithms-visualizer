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
     * Sets up initial state during mount and reset
     */
    function initialSetup() {
        function createPossibleNode(row, column) {
			return {
				id: '',
				row: row,
				column: column,
				isActive: false,
                modifiers: ''
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
    }

	/**
	 * On mount setup an initial grid
	 */
	useEffect(() => {
		initialSetup()
	}, [])

    // function handleReset() {
    //     initialSetup()
    //     // TODO: setup reference to done button to set disabled=false and change controllerContext to setVertices
    // }

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
     * Toggle controllerContext and handle changes in controller context by building the adjecency matrix
     */
    function handleDone(e) {
        if (controllerContext == 'setVertices') {
            // Update context
            setControllerContext('setEdges')
            // Inittialize adj matrix
            initializeAdjecencyMatrix(graph, setGraph)
            // Filter to only display active nodes
            const newGrid = grid.slice()
            newGrid.forEach(function filterActiveNodes(rowArray) {
                rowArray.forEach((node) => {
                    if (!node.isActive) {
                        node.modifiers = ' node--not-in-graph'
                    }
                })
            })
            setGrid(newGrid)

        } else if (controllerContext == 'setEdges') {
            setControllerContext('done')
            // TODO: setup drag event handlers and build edges in the adjecency matrix
        } else if (controllerContext == 'done') {
            e.target.disabled = true
        }
    }

    return (
        <React.Fragment>
            <Grid grid={grid} controllerContext={controllerContext} handleClick={handleClick} />
            <GraphController handleDone={handleDone} />
        </React.Fragment>
    )
}

export default Visualizer