import './Visualizer.scss'
import React, { useEffect, useState } from 'react'

import Grid from '../Grid/Grid'
import GraphController from '../GraphController/GraphController'

import {initializeAdjecencyMatrix, addEdge} from '../algorithmInterface.js'

function Visualizer(props) {
    /**
     * Non state variables
     */
    const GRID_LENGTH = 10
    let edgeStart
    let edgeEnd

	/**
	 * State
	 */
	const [grid, setGrid] = useState([])
    const [idCount, setIdCount] = useState(0)
    const [graph, setGraph] = useState([])
    const [controllerMode, setControllerMode] = useState('setVertices')

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
		for (let i = 0; i < GRID_LENGTH; i++) {
            const columnPossibleNodes = []
			for (let j = 0; j < GRID_LENGTH; j++) {
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
    //     // TODO: setup reference to done button to set disabled=false and change controllerMode to setVertices
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
     * Identify edge source vertex
     */
    function handleDragStart(id, e) {
        e.target.style.opacity = 0.5
        edgeStart = id
        console.log(edgeStart)
    }

    /**
     * Identify edge destination vertex and update the adjecency matrix
     */
    function handleOnDrop(id, e) {
        e.preventDefault()
        edgeEnd = id
        console.log(edgeEnd)
        addEdge(graph, setGraph, edgeStart, edgeEnd)
    }


    /**
     * Toggle controllerMode and handle changes in controller context by building the adjecency matrix
     * Controller Modes - setVertices, setEdges, done
     */
    function handleDone(e) {
        if (controllerMode == 'setVertices') {
            // Update context
            setControllerMode('setEdges')
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

        } else if (controllerMode == 'setEdges') {
            setControllerMode('done')

        } else if (controllerMode == 'done') {
            e.target.disabled = true
        }
    }

    return (
        <React.Fragment>
            <Grid grid={grid} 
            controllerMode={controllerMode} 
            handleClick={handleClick} 
            handleDragStart={handleDragStart}
            handleOnDrop={handleOnDrop}
            />
            <GraphController handleDone={handleDone} />
        </React.Fragment>
    )
}

export default Visualizer