import './Node.scss'
import React, { forwardRef, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Define how to render a particular node
 */
const Node = forwardRef((props, ref) => {
    /**
     * Animations
     */
    useLayoutEffect(() => {
        gsap.from(ref.current[props.id], {
            scale: 0,
            duration: 0.5,
            ease: 'Power4.easeOut'
        })
    }, [ref])

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
                x={props.cx}
                y={props.cy + 7.5}
                className={'text'}
                textAnchor='middle'
                alignmentBaseline='middle'
            >{props.id}</text>
            <circle
                cx={props.cx}
                cy={props.cy}
                r='20'
                fill={props.fill}

                ref={(el) => {return ref.current[props.id] = el}}

                className={'circle' + props.modifiers}
                id={props.id}

                onClick={props.handleNodeClick}
                onMouseEnter={props.controllerMode == 'setEdges' ? handleOnMouseEnter : () => {}}
                onMouseLeave={props.controllerMode == 'setEdges' ? handleOnMouseLeave : () => {}}
            />
        </React.Fragment>
    )
})

export default Node