import './InteractiveConsole.scss'

import React, { forwardRef } from 'react'

const InteractiveConsole = forwardRef((props, ref) => {
    return (
        <section 
            id='interactive-console'
            ref={ref}
        >
            {props.message}
        </section>
    )
})

export default InteractiveConsole