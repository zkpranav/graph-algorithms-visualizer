import './Node.scss'

import React from 'react'

/**
 * Define how to render a particular node
 */
function Node(props) {
    return (
        <circle
            cx={props.cx}
            cy={props.cy}
            r='25'

            className='circle'
            id={props.id}
            onClick={props.handleNodeClick}
        />
    )
}

export default Node