import './Menu.css'

/**
 * Allow picking an algorithm and render other info
 */
function Menu(props) {
    let displayText = ''
    switch (props.controllerMode) {
        case 'setVertices':
            displayText = 'Click to Add a Vertex to the Graph'
            break;
        case 'setEdges':
            displayText = 'To Add an Edge, first click the Source-Vextex then the Destination-Vertex'
            break;
        case 'done':
            displayText = 'Select an Algorithm and Begin'
            break;
    }

    const options = []
    props.algorithms.forEach(algorithm => {
        options.push(
            <option 
                key={algorithm}
                value={algorithm} 
            >
                {algorithm}
            </option>
        )
    })

    return (
        <section id='menu' >
            <select 
                id='algorithm-selector' 
                value={props.selectedAlgorithm}
                onChange={props.handleAlgorithmChange}
            >
                {options}
            </select>
            <button 
                id='begin'
                disabled={props.controllerMode != 'done'}
                onClick={props.handleBegin} 
            >{'Begin'}</button>
            <p id='display-text' >{ displayText }</p>
        </section>
    )
}

export default Menu