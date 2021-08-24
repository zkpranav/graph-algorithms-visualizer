import './GraphController.scss'
import React from 'react'

function GraphController(props) {
    return (
        <div className='graph-controller' >
            <label htmlFor='done' >
                <button name='done' onClick={props.handleDone}>Done</button>
            </label>
        </div>
    )
}

export default GraphController