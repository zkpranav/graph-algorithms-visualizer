import './Node.scss'
import React from 'react'

function Node(props) {
    let modifiers = ''
    if (props.isActive) {
        modifiers += 'node--is-active'
    }

    return (
        <div className={`node ${modifiers}`} onClick={() => {props.handleClick(props.row, props.column)}} >
            {props.isActive ? props.id : ''}
        </div>
    )
}

export default Node