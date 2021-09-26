import getDegree from './algorithms/getDegree.js'
import greedyGraphColoring from './algorithms/greedyGraphColoring.js'
import isComplete from './algorithms/isComplete.js'

/**
 * Utilities
 */
function getRandomColor() {
	return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.75)`
}

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
		'Greedy Graph Coloring',
		'Is Complete?'
	]
}

/**
 * Algorithm controller to trigger appropriate algorithm based on the argument passed
 */
let result
function useAlgorithmController(selectedAlgorithm, nodes, setNodes, adjMatrix) {
	switch (selectedAlgorithm) {
		case 'Get Degree':
			result = getDegreeInterface(adjMatrix)
			return [
				`Degree of the Graph: ${result.graphDegree}`,
				`Degrees of each Vertex: ${result.vertexDegrees.join(' ')}`
			]
		
		case 'Greedy Graph Coloring':
			result = greedyGraphColoringInterface(nodes, setNodes, adjMatrix)
			return [
				`Chromatic Number: ${result.chromaticNumber}`
			]

		case 'Is Complete?':
			result = isComplete(adjMatrix)
			return result ?
						[`Graph is Complete`] :
						[`Graph is not Complete`]
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

function greedyGraphColoringInterface(nodes, setNodes, adjMatrix) {
	const coloringResult = greedyGraphColoring(adjMatrix)
	const colors = []
	for (let i = 0; i < coloringResult.noDuplicateColors.length; i++) {
		colors.push(getRandomColor())
	}

	const newNodes = nodes.slice()
	for (let i = 0; i < newNodes.length; i++) {
		newNodes[i].fill = colors[coloringResult.coloringSequence[i] - 1]
	}
	setNodes(newNodes)

	return {
		chromaticNumber: coloringResult.chromaticNumber
	}
}

export {
    initializeAdjecencyMatrix,
    addEdge,
	getAlgorithms,
	useAlgorithmController
}