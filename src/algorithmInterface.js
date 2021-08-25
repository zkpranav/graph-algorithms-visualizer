import getDegree from './algorithms/getDegree.js'

function getAlgorithms() {
	return ['getDegree']
}

/**
 * Initializes the adjecency matrix
 */
function initializeAdjecencyMatrix(graph, setGraph) {
	const newGraph = graph.slice()
	newGraph.forEach(function initialEdges(edges) {
		for (let i = 0; i < newGraph.length; i++) {
			edges.push(0)
		}
	})

	setGraph(newGraph)
	// console.log(graph)
}

/**
 * Updates the adjecency matrix with an edge
 */
function addEdge(graph, setGraph, edgeStart, edgeEnd) {
	const newGraph = graph.slice()
	newGraph[edgeStart][edgeEnd] = 1
	setGraph(newGraph)
}

/**
 * Interfaces
 */
function getDegreeInterface(adjMatrix) {
	let maxDegree = 0
	const vertexDegrees = []
	for (let i = 0; i < adjMatrix.length; i++) {
		vertexDegrees.push(getDegree(adjMatrix, i))
		if (vertexDegrees[i] > maxDegree) {
			maxDegree = vertexDegrees[i]
		}
	}

	return maxDegree
}


export {initializeAdjecencyMatrix, 
	addEdge, 
	getAlgorithms, 
	getDegreeInterface
}