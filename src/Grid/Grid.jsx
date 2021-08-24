import './Grid.scss'
import React, { useEffect } from 'react'

import Node from '../Node/Node.jsx'

function Grid(props) {
    return (
        <div className='grid' >
            {props.grid.map(function renderRows(row) {
                return (
                    row.map(function renderNodes(node) {
                        return (
                            <Node 
                            key={`${node.row}, ${node.column}`} {...node} 
                            handleClick={props.handleClick} />
                        )
                    })
                )
            })}
        </div>
    )
}

export default Grid