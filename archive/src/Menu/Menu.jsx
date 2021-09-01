import './Menu.scss'
import React from 'react'

function Menu(props) {
    const options = []
    props.algorithms.forEach((algorithm) => {
        options.push(
            <option key={algorithm} value={algorithm} >{algorithm}</option>
        )
    })

    

    return (
        <div>
            <label htmlFor={'select-algorithm'} >
                Pick an algorithm:{' '}
                <select
                    name='select-algorithm' 
                    value={props.selectedAlgorithm} 
                    onChange={props.handleChange}
                    disabled={props.controllerMode == 'done' ? false : true}
                >
                    {options}
                </select>
            </label>
            <button 
                onClick={props.handleBegin}
                disabled={props.controllerMode == 'done' ? false : true}
            >Begin</button>
        </div>
    )
}

export default Menu