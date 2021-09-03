import './Sidebar.css'

import React from 'react'
import Info from '../Info/Info.jsx'

function Sidebar(props) {
    function handleToggleSidebar(e) {
        document.querySelector('#sidebar').style.display = 'flex'
    }

    function handleMenuCollapse(e) {
        document.querySelector('#sidebar').style.display = 'none'
    }

    return (
        <React.Fragment >
            <button 
                id='toggle-sidebar'
                onClick={handleToggleSidebar}
            >&#9776;</button>
            <div id='sidebar'>
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
                    To add a Vertex, Simply tap
                    </li>
                    <li>
                        Set Edges of the Graph<br />
                        To set and edge, first tap the Source-Vertex and then the Destination-Vertex
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