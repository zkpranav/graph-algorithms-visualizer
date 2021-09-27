import './Node.scss'
import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Define how to render a particular node
 */
function Node(props) {
    /**
     * Refs
     */
    const nodeRef = useRef()

    /**
     * Animations
     */
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

    function handleOnMouseEnter(e) {
        gsap.to(e.target, {
            scale: 1.2,
            duration: 0.25,
            ease: 'Power1.easeInOut'
        })
    }

    function handleOnMouseLeave(e) {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.25,
            ease: 'Power1.easeInOut'
        })
    }

    return (
        <React.Fragment key={props.id} >
            <text 
                x={props.cx - 5}
                y={props.cy + 7.5}
                className={'text'}
            >{props.id}</text>
            <circle
                cx={props.cx}
                cy={props.cy}
                r='20'
                fill={props.fill}

                ref={nodeRef}

                className={'circle' + props.modifiers}
                id={props.id}

                onClick={props.handleNodeClick}
                onMouseEnter={props.controllerMode == 'setEdges' ? handleOnMouseEnter : () => {}}
                onMouseLeave={props.controllerMode == 'setEdges' ? handleOnMouseLeave : () => {}}
            />
        </React.Fragment>
    )
}

export default Node