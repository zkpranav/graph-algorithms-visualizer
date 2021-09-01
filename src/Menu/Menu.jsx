import './Menu.scss'

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
            displayText = 'To Add an Edge, first click the Source Vextex then the Destination Vertex'
            break;
        case 'done':
            displayText = 'Select an Algorithm and Begin'
            break;
    }

    return (
        <div id='menu' >
            <select id='algorithm-selector' value='getDegree' >
                <option value='getDegree' >Get Degree</option>
            </select>
            <button id='begin' >Begin</button>
            <p id='display-text' >{ displayText }</p>
        </div>
    )
}

export default Menu