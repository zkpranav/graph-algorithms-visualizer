import './Visualizer.scss'

import React, { useState, useRef } from 'react'
import Graph from '../Graph/Graph.jsx'
import GraphController from '../GraphController/GraphController.jsx'
import Edge from '../Edge/Edge.jsx'
import Menu from '../Menu/Menu.jsx'
import InteractiveConsole from '../InteractiveConsole/InteractiveConsole.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'

import {
    addEdge,
    initializeAdjecencyMatrix,
    getAlgorithms,
    useAlgorithmController
} from '../algorithm-interface.js'

function Visualizer(props) {
    /**
     * State variables
     */
    const [nodes, setNodes] = useState([])
    const [adjMatrix, setAdjMatrix] = useState([])
    const [controllerMode, setControllerMode] = useState('setVertices')
    const [isFirstNode, setIsFirstNode] = useState(true)
    const [edges, setEdges] = useState([])
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Greedy Graph Coloring')
    const [message, setMessage] = useState('>>')

    /**
     * ref variables
     */
    let edgeStart = useRef(null)
    let edgeEnd = useRef(null)
    let interactiveConsoleRef = useRef(null)
    

    /**
     * Utilities
     */
    function getRandomColor() {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.75)`
    }

    /**
     * Returns node properties
     */
    function createNewNode(x, y) {
        return {
            id: nodes.length,
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
        setAdjMatrix([])
        setControllerMode('setVertices')
        setIsFirstNode(true)
        setEdges([])
        setSelectedAlgorithm('Greedy Graph Coloring')
        setMessage('>>')

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

            // TODO: Archive the original graph

            // Add modifiers
            addModifier('done')

            // console.log('--- Adjecency Matrix ---')
            // console.log(adjMatrix)
        }
    }

    /**
     * Add nodes on click
     */
    function handleGraphClick(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left
        const y = e.clientY - e.target.getBoundingClientRect().top

        /**
         * Modify state by adding a node
         */
        const newNodes = nodes.slice()
        newNodes.push(createNewNode(x, y))
        setNodes(newNodes)

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
            } else if (adjMatrix[edgeStart.current][+e.target.getAttribute('id')] === 0) {
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
        const result = useAlgorithmController(selectedAlgorithm, nodes, setNodes, adjMatrix)
        generateConsoleMessage(result)
        interactiveConsoleRef.current.scrollIntoView()
    }

    return (
        <React.Fragment>
            <Sidebar 
                algorithms={getAlgorithms()}
            />
            <main id='visualizer'>
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
                    ref={interactiveConsoleRef}
                />
            </main>
        </React.Fragment>
    )
}

export default Visualizer