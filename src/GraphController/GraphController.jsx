import './GraphController.scss'

import React from 'react'

function GraphController(props) {
    let doneButtonDisplay = ''
    if (props.controllerMode == 'setVertices') {
        doneButtonDisplay = 'Confirm Vertices'
    } else if (props.controllerMode == 'setEdges') {
        doneButtonDisplay = 'Confirm Edges'
    } else {
        doneButtonDisplay = 'Confirmed'
    }

    return (
        <section id='graph-controller'>
            <button 
                id='mode-controller' 
                onClick={props.handleDone}
                disabled={props.controllerMode == 'done'}
            >{doneButtonDisplay}</button>
            <button
                id='reset'
                onClick={props.handleReset}
            >{'Reset'}</button>
            {/* <button 
                id='get-graph'
                disabled={props.controllerMode != 'done'}
                onClick={props.handleGetOriginalGraph}
            >{'Original Graph'}</button> */}
        </section>
    )
}

export default GraphController