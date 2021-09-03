import './Sidebar.css'

import React from 'react'
import Info from '../Info/Info.jsx'
import { gsap } from 'gsap'

function Sidebar(props) {
    /**
     * ref variables
     */
    const sidebar = React.createRef()

    function handleToggleSidebar(e) {
        sidebar.current.style.display = 'flex'
        gsap.from(sidebar.current, {
            x: -sidebar.current.clientWidth,
            duration: 0.5,
            ease: 'power3.out'
        })
    }

    function handleMenuCollapse(e) {
        sidebar.current.style.display = 'none'
    }

    return (
        <React.Fragment >
            <button 
                id='toggle-sidebar'
                onClick={handleToggleSidebar}
            >&#9776;</button>
            <div 
                ref={sidebar}
                id='sidebar'
            >
                <button 
                    id='menu-collapse' 
                    onClick={handleMenuCollapse}
                >{'X'}</button>
                <header>
                    <h1>Graphs Galore</h1>
                </header>
                <Info 
                    algorithms={props.algorithms}
                />
                <ol id='tutorial' >
                    <li>
                    Set Vertices of the Graph<br />
                    To add a Vertex, Simply Click in the rectangular area
                    </li>
                    <li>
                        Set Edges of the Graph<br />
                        To set and edge, first click the Source-Vertex and then the Destination-Vertex
                    </li>
                    <li>
                        Finally, select an Algorithm and begin
                    </li>
                </ol>
            </div>
            <div id='vertical-scroll'>
                {'Scroll to reveal console'}
            </div>
        </React.Fragment>
    )
}

export default Sidebar