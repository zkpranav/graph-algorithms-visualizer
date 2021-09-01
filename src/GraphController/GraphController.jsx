import './GraphController.scss'

import React from 'react'

function GraphController(props) {
    return (
        <div className='graph-controller'>
            <button 
                id='mode-controller' 
                onClick={props.handleDone}
            >{'Done'}</button>
            <button
                id='reset'
                onClick={props.handleReset}
            >{'Reset'}</button>
        </div>
    )
}

export default GraphController