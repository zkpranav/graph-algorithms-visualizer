import './Node.scss'
import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Define how to render a particular node
 */
function Node(props) {
    const nodeRef = useRef()
    useLayoutEffect(() => {
        gsap.set(nodeRef.current, {
            'transform-origin': '20px 20px'
        })

        gsap.from(nodeRef.current, {
            scale: 0,
            duration: 0.5,
            ease: 'Power4.easeOut'
        })
    }, [nodeRef])

    return (
        <React.Fragment key={props.id} >
            <circle
                cx={props.cx}
                cy={props.cy}
                r='20'
                fill={props.fill}

                ref={nodeRef}

                className={'circle' + props.modifiers}
                id={props.id}
                onClick={props.handleNodeClick}
            />
        </React.Fragment>
    )
}

export default Node