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
	]
}

/**
 * Algorithm controller to trigger appropriate algorithm based on the argument passed
 */
function algorithmController(selectedAlgorithm, adjMatrix) {
	switch (selectedAlgorithm) {
		case 'Get Degree':
			const result = getDegreeInterface(adjMatrix)
			return [
				`Degree of the Graph: ${result.graphDegree}`,
				`Degrees of each Vertex: ${result.vertexDegrees.join(' ')}`
			]
	}
}

/**
 * Interface methods
 */
function getDegreeInterface(adjMatrix) {
	const vertexDegrees = []

	for (let i = 0; i < adjMatrix.length; i++) {
		vertexDegrees.push(getDegree(adjMatrix, i))
	}

	const temp = vertexDegrees.slice()
	const maxDegree = temp.sort()[temp.length - 1]
	return {
		graphDegree: maxDegree,
		vertexDegrees: vertexDegrees
	}
}

export {
    initializeAdjecencyMatrix,
    addEdge,
	getAlgorithms,
	algorithmController
}