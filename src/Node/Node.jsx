import './Node.scss'

import React from 'react'

/**
 * Define how to render a particular node
 */
function Node(props) {

    return (
        <React.Fragment key={props.id} >
            <circle
                cx={props.cx}
                cy={props.cy}
                r='20'
                fill={props.fill}

                className={'circle' + props.modifiers}
                id={props.id}
                onClick={props.handleNodeClick}
            />
        </React.Fragment>
    )
}

export default Node