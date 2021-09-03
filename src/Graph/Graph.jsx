import './Graph.css'

import React, { useEffect } from 'react'
import Node from '../Node/Node.jsx'

/**
 * Create an SVG elemnt to dynamically render nodes within
 */
function Graph(props) {
    /**
     * Allow onClick events only in setVertices mode
     */
    let handleGraphClick = () => {}
    if (props.controllerMode == 'setVertices') {
        handleGraphClick = props.handleGraphClick
    }

    /**
     * Allow node onClick events only in setEdges ode
     */
    let handleNodeClick = (e) => {
        // Prevent graph's click from firing
        e.stopPropagation()
    }
    if (props.controllerMode == 'setEdges') {
        handleNodeClick=props.handleNodeClick
    }

    // TODO: Handle resize
    let viewportWidth = '65vw'
    let viewportHeight = '75vh'

    return (
        <svg 
            xmlns='http://www.w3.org/2000/svg'
            viewport={`0 0 ${viewportWidth} ${viewportHeight}`}

            className='graph'
            onClick={handleGraphClick}
        >
            {
                props.edges
            }
            {
                props.nodes.map((node) => {
                    return (
                        <Node 
                            key={node.id}
                            {...node}
                            handleNodeClick={handleNodeClick}
                        />
                    )
                })
            }
        </svg>
    )
}

export default Graph