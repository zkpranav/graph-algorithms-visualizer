import './GraphController.scss'

import React from 'react'

function GraphController(props) {
    return (
        <div id='graph-controller'>
            <button 
                id='mode-controller' 
                onClick={props.handleDone}
                disabled={props.controllerMode == 'done'}
            >{'Done'}</button>
            <button
                id='reset'
                onClick={props.handleReset}
            >{'Reset'}</button>
        </div>
    )
}

export default GraphController