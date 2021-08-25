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
            draggable={props.isActive}
            onDragStart={(e) => {props.handleDragStart(props.id, e)}}
            onDragEnd={(e) => {e.target.style.opacity = 1.0}}
            onDragOver={(e) => {e.preventDefault()}}
            onDrop={(e) => {props.handleOnDrop(props.id, e)}}
        >
            {props.isActive ? props.id : ''}
        </div>
    )
}

export default Node