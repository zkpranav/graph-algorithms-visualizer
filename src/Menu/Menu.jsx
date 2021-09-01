import './Menu.scss'

/**
 * Allow picking an algorithm and render other info
 */
function Menu(props) {
    return (
        <div id='menu' >
            <select id='algorithm-selector' value='getDegree' >
                <option value='getDegree' >Get Degree</option>
            </select>
            <button id='begin' >Begin</button>
        </div>
    )
}

export default Menu