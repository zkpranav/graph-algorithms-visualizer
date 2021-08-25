import './Node.scss'
import React from 'react'

function Node(props) {
    let handleClick = props.handleClick
    let modifiers = props.modifiers

    if (props.isActive) {
        modifiers += ' node--is-active'
        handleClick = () => {}
    }
    
    return (
        <div 
        className={`node ${modifiers}`} 
        onClick={() => {handleClick(props.row, props.column)}} 
        draggable={true}
        >
            {props.isActive ? props.id : ''}
        </div>
    )
}

export default Node