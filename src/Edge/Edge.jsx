import './Edge.scss'

import React from 'react'

function Edge(props) {
    return (
        <line 
            x1={props.x1}
            y1={props.y1}
            x2={props.x2}
            y2={props.y2}

            id={props.id}
            className='edge'
        />
    )
}

export default Edge