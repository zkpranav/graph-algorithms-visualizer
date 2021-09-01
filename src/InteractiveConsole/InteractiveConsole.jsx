import './InteractiveConsole.scss'

import React from 'react'

function InteractiveConsole(props) {
    return (
        <div id='interactive-console' >
            {props.message}
        </div>
    )
}

export default InteractiveConsole