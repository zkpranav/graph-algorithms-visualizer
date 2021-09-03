import './InteractiveConsole.css'

import React from 'react'

function InteractiveConsole(props) {
    return (
        <section id='interactive-console' >
            {props.message}
        </section>
    )
}

export default InteractiveConsole