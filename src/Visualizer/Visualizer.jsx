import React, { useEffect, useState, useRef } from 'react'
import Graph from '../Graph/Graph.jsx'
import GraphController from '../GraphController/GraphController.jsx'
import {
    addEdge,
    initializeAdjecencyMatrix
} from '../algorithm-interface.js'

function Visualizer(props) {
    /**
     * State variables
     */
    const [nodes, setNodes] = useState([])
    const [idCount, setIdCount] = useState(0)
    const [adjMatrix, setAdjMatrix] = useState([])
    const [controllerMode, setControllerMode] = useState('setVertices')
    const [isFirstNode, setIsFirstNode] = useState(true)

    /**
     * ref variables
     */
    let edgeStart = useRef(undefined)
    let edgeEnd = useRef(undefined)

    /**
     * Utilities
     */
    function createNewNode(x, y) {
        return {
            id: idCount,
            cx: x,
            cy: y
        }
    }

    /**
     * Event Handlers
     */


    /**
     * Handling reset
     */
    function handleReset(e) {
        /**
         * Reset state
         */
        setNodes([])
        setIdCount(0)
        setAdjMatrix([])
        setControllerMode('setVertices')
        setIsFirstNode(true)

        /**
         * Reset refs
         */
        edgeStart.current = undefined
        edgeEnd.current = undefined

        /**
         * Reset DOM
         */
        document.querySelector('#mode-controller').disabled = false
    }

    /**
     * Toggle controllerMode and handle changes in controller context by building the adjecency matrix
     * Controller Modes - setVertices, setEdges, done, (TODO: setWeights)
     */
    function handleDone(e) {
        if (controllerMode == 'setVertices') {
            if (adjMatrix.length == 0) {
                return
            }

            // Update context
            setControllerMode('setEdges')
            // Initialize adjecency matrix
            initializeAdjecencyMatrix(adjMatrix, setAdjMatrix)
            // console.log(adjMatrix)

        } else if (controllerMode == 'setEdges') {
            // Update context
            setControllerMode('done')
            // Disable controller
            e.target.disabled = true
        }
    }

    /**
     * Add nodes on click
     */
    function handleGraphClick(e) {
        const x = e.clientX - (window.innerWidth * 0.1)
        const y = e.clientY - (window.innerHeight * 0.1)

        /**
         * Modify state by adding a node
         */
        const newNodes = nodes.slice()
        newNodes.push(createNewNode(x, y))
        setNodes(newNodes)
        setIdCount(idCount + 1)

        /**
         * Make space for it in the adjMatrix
         */
        const newAdjMatrix = adjMatrix.slice()
        newAdjMatrix.push([])
        setAdjMatrix(newAdjMatrix)
    }

    /**
     * Adding edges
     */
    function handleNodeClick(e) {
        if (isFirstNode) {
            edgeStart.current = +e.target.getAttribute('id')
            setIsFirstNode(false)
        } else {
            // Check if edge to itself
            if (edgeStart.current == +e.target.getAttribute('id')) {
                edgeStart.current = undefined
                edgeEnd.current = undefined
                setIsFirstNode(true)
            } else {
                edgeEnd.current = +e.target.getAttribute('id')
                setIsFirstNode(true)

                addEdge(adjMatrix, setAdjMatrix, edgeStart.current, edgeEnd.current)
            }
        }
    }
    
    console.log(adjMatrix)
    return (
        <div className='visualizer'>
            <Graph 
                nodes={nodes}
                handleGraphClick={handleGraphClick}
                controllerMode={controllerMode}
                handleNodeClick={handleNodeClick}
            />
            <GraphController
                handleDone={handleDone}
                handleReset={handleReset}
            />
        </div>
    )
}

export default Visualizer