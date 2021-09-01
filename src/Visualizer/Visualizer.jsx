import React, { useState, useRef } from 'react'
import Graph from '../Graph/Graph.jsx'
import GraphController from '../GraphController/GraphController.jsx'
import Edge from '../Edge/Edge.jsx'
import Menu from '../Menu/Menu.jsx'
import InteractiveConsole from '../InteractiveConsole/InteractiveConsole.jsx'

import {
    addEdge,
    initializeAdjecencyMatrix,
    getAlgorithms,
    algorithmController
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
    const [edges, setEdges] = useState([])
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Get Degree')
    const [message, setMessage] = useState('>>')

    /**
     * ref variables
     */
    let edgeStart = useRef(undefined)
    let edgeEnd = useRef(undefined)

    /**
     * Utilities
     */
    function getRandomColor() {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    }

    /**
     * Returns node properties
     */
    function createNewNode(x, y) {
        return {
            id: idCount,
            cx: x,
            cy: y,
            fill: getRandomColor(),
            modifiers: ''
        }
    }

    function generateConsoleMessage(msgs) {
        const messages = msgs.map((msg, index) => {
            return (
                <p key={index} >{'>> ' + msg}</p>
            )
        })

        setMessage(messages)
    }

    function addModifier(modifier) {
        const newNodes = nodes.slice()
        newNodes.forEach(node => {
            node.modifiers += ' ' + modifier 
        })
    }

    /**
     * Populate edges based on adjecency matrix
     */
    function drawEdge() {
        const [nodeStart] = nodes.filter(node => node.id == edgeStart.current)
        const [nodeEnd] = nodes.filter(node => node.id == edgeEnd.current)
        // console.log(nodeStart, nodeEnd)

        const newEdges = edges.slice()
        newEdges.push(
            <Edge 
                key={`${edgeStart.current}${edgeEnd.current}`}
                id={`${edgeStart.current}${edgeEnd.current}`}
                x1={nodeStart.cx}
                y1={nodeStart.cy}
                x2={nodeEnd.cx}
                y2={nodeEnd.cy}
            />
        )
        setEdges(newEdges)
    }

    /**
     * Event Handlers
     */

    /**
     * Handling reset
     */
    function handleReset(e) {
        /**
         * Reset states
         */
        setNodes([])
        setIdCount(0)
        setAdjMatrix([])
        setControllerMode('setVertices')
        setIsFirstNode(true)
        setEdges([])
        setSelectedAlgorithm('Get Degree')

        /**
         * Reset refs
         */
        edgeStart.current = undefined
        edgeEnd.current = undefined
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

            // Apply modifiers
            addModifier('hovered-node')

        } else if (controllerMode == 'setEdges') {
            // Update context
            setControllerMode('done')

            console.log('--- Adjecency Matrix ---')
            console.log(adjMatrix)
        }
    }

    /**
     * Add nodes on click
     */
    function handleGraphClick(e) {
        const x = e.clientX - (window.innerWidth * 0.3)
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

                drawEdge()
            }
        }
    }

    /**
     * Handling algorithm selection
     */
    function handleAlgorithmChange(e) {
        setSelectedAlgorithm(e.target.value)
    }

    /**
     * Handle algorithm execution
     */
    function handleBegin() {
        const result = algorithmController(selectedAlgorithm, adjMatrix)
        generateConsoleMessage(result)
    }

    return (
        <main className='visualizer'>
            <Menu
                algorithms={getAlgorithms()}
                selectedAlgorithm={selectedAlgorithm}
                controllerMode={controllerMode}
                handleAlgorithmChange={handleAlgorithmChange}
                handleBegin={handleBegin}
            />
            <Graph 
                nodes={nodes}
                edges={edges}
                adjMatrix={adjMatrix}
                handleGraphClick={handleGraphClick}
                controllerMode={controllerMode}
                handleNodeClick={handleNodeClick}
            />
            <GraphController
                controllerMode={controllerMode}
                handleDone={handleDone}
                handleReset={handleReset}
            />
            <InteractiveConsole
                message={message}
            />
        </main>
    )
}

export default Visualizer