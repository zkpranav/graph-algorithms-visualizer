import './Visualizer.scss'
import React, { useEffect, useState } from 'react'

import Grid from '../Grid/Grid'
import GraphController from '../GraphController/GraphController'
import Menu from '../Menu/Menu.jsx'

import {initializeAdjecencyMatrix, 
    addEdge, 
    getAlgorithms,
    getDegreeInterface
} from '../algorithmInterface.js'

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
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('getDegree')

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

    /**
     * Clear the grid, reset states and enable the done button
     */
    function handleReset() {
        initialSetup()
        setIdCount(0)
        setGraph([])
        setControllerMode('setVertices')
        document.querySelector('#mode-controller').disabled = false
    }

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
         * Recognize to be a vertex in the graph by allocating an edge array
         */
        setGraph([...graph, []])
    }

    /**
     * Identify edge source vertex
     */
    function handleDragStart(id, e) {
        e.target.style.opacity = 0.5
        edgeStart = id
        // console.log(edgeStart)
    }

    /**
     * Identify edge destination vertex and update the adjecency matrix
     */
    function handleOnDrop(id, e) {
        e.preventDefault()
        edgeEnd = id
        // console.log(edgeEnd)
        addEdge(graph, setGraph, edgeStart, edgeEnd)
    }

    /**
     * Keep track of the selected algorithm
     */
    function handleChange(e) {
        setSelectedAlgorithm(e.target.value)
    }

    /**
     * Begin the algorithm
     */
    function handleBegin(e) {
        e.target.disabled = true
        
        let result
        switch(selectedAlgorithm) {
            case 'getDegree': 
                result = getDegreeInterface(graph)
                break
        }

        console.log(result)
    }


    /**
     * Toggle controllerMode and handle changes in controller context by building the adjecency matrix
     * Controller Modes - setVertices, setEdges, done, (TODO: setWeights)
     */
    function handleDone(e) {
        if (controllerMode == 'setVertices') {
            // If no vertices selected
            if (graph.length == 0) {
                return
            }

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
            e.target.disabled = true

            // console.log(graph)
        }
    }

    return (
        <React.Fragment>
            <Menu 
                selectedAlgorithm={selectedAlgorithm}
                algorithms={getAlgorithms()}
                handleChange={handleChange}
                controllerMode={controllerMode}
                handleBegin={handleBegin}
            />
            <Grid grid={grid} 
                controllerMode={controllerMode} 
                handleClick={handleClick} 
                handleDragStart={handleDragStart}
                handleOnDrop={handleOnDrop}
            />
            <GraphController 
                handleDone={handleDone} 
                handleReset={handleReset}
            />
        </React.Fragment>
    )
}

export default Visualizer