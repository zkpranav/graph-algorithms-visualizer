import './Grid.scss'
import React, { useEffect } from 'react'

import Node from '../Node/Node.jsx'

function Grid(props) {
    /**
     * Allows onClick events only in setVertices mode
     */
    let handleClick = () => {}
    if (props.controllerMode == 'setVertices') {
        handleClick = props.handleClick
    }

    /**
     * Allows Drag events only in setEdges mode
     */
    let handleDragStart = () => {}
    let handleOnDrop = () => {}
    if (props.controllerMode == 'setEdges') {
        handleDragStart = props.handleDragStart
        handleOnDrop = props.handleOnDrop
    }

    return (
        <div className='grid' >
            {props.grid.map(function renderRows(row) {
                return (
                    row.map(function renderNodes(node) {
                        return (
                            <Node 
                            key={`${node.row}, ${node.column}`} {...node} 
                            handleClick={handleClick} 
                            handleDragStart={handleDragStart}
                            handleOnDrop={handleOnDrop}
                            />
                        )
                    })
                )
            })}
        </div>
    )
}

export default Grid