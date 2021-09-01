import getDegree from './algorithms/getDegree.js'

/**
 * Initializes the adjecency matrix
 */
 function initializeAdjecencyMatrix(adjMatrix, setAdjMatrix) {
	const newAdjMatrix = adjMatrix.slice()
	newAdjMatrix.forEach(function initialEdges(edges) {
		for (let i = 0; i < newAdjMatrix.length; i++) {
			edges.push(0)
		}
	})

	setAdjMatrix(newAdjMatrix)
}

/**
 * Updates the adjecency matrix by adding two edges
 */
 function addEdge(adjMatrix, setAdjMatrix, edgeStart, edgeEnd) {
	const newAdjMatrix = adjMatrix.slice()
	newAdjMatrix[edgeStart][edgeEnd] = 1
	newAdjMatrix[edgeEnd][edgeStart] = 1
	setAdjMatrix(newAdjMatrix)
}

/**
 * Return all available algorithms
 */
function getAlgorithms() {
	return [
		'Get Degree',
		'Greedy Graph Coloring'
	]
}

export {
    initializeAdjecencyMatrix,
    addEdge,
	getAlgorithms
}