import './Sidebar.scss'

import React, { useRef } from 'react'
import Info from '../Info/Info.jsx'
import { useRef } from 'react'
import { gsap } from 'gsap'

function Sidebar(props) {
    /**
     * ref variables
     */
    const sidebar = useRef()

    function handleToggleSidebar() {
        gsap.to(sidebar.current, {
            display: 'flex',
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'Power2.easeOut'
        })
    }

    function handleMenuCollapse() {
        gsap.to(sidebar.current, {
            display: 'none',
            y: - (sidebar.current.clientHeight + 5),
            opacity: 0,
            duration: 0.3,
            ease: 'Power2.easeIn'
        })

    }

    return (
        <React.Fragment >
            <button 
                id='toggle-sidebar'
                onClick={handleToggleSidebar}
            >☰</button>
            <div 
                ref={sidebar}
                id='sidebar'
            >
                <button 
                    id='menu-collapse' 
                    onClick={handleMenuCollapse}
                >{'x'}</button>
                <Info 
                    algorithms={props.algorithms}
                />
            </div>
        </React.Fragment>
    )
}

export default Sidebar