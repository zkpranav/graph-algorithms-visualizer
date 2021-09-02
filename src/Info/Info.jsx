import './Info.scss'

import React from 'react'

function Info(props) {
    const supportedAlgorithms = []
    props.algorithms.forEach(algorithm => {
        const listItem = (
            <li key={algorithm} >
                <a 
                    href='#'
                    title={`Wikipedia article for ${algorithm}`}
                >{algorithm}</a>
            </li>
        )
        supportedAlgorithms.push(listItem)
    })


    return (
        <section id='info' >
            <h2>Currently Supported: </h2>
            <dl >
                <dt><a href='#' title='Wikipedia article for Graph' >Simple Graph: </a></dt>
                <dd>
                    A Graph with atleast one vertex, |V| = 1,
                    and Non-Weighted, Undirected edges without any Self-Loops or Multi-Edges
                </dd>
            </dl>

            <h2>Supported Algorithms: </h2>
            <ul>
                {supportedAlgorithms}
            </ul>
        </section>
    )
}

export default Info