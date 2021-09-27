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
 * API methods
 */

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
async function useAlgorithmController(selectedAlgorithm, nodes, setNodes, adjMatrix, nodeRefs) {
	switch (selectedAlgorithm) {
		case 'Get Degree':
			result = await getDegreeInterface(adjMatrix, nodeRefs)
			return [
				`Degree of the Graph: ${result.graphDegree}`,
				`Degrees of each Vertex: ${result.vertexDegrees.join(' ')}`
			]
		
		case 'Greedy Graph Coloring':
			result = await greedyGraphColoringInterface(nodes, setNodes, adjMatrix, nodeRefs)
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
async function getDegreeInterface(adjMatrix, nodeRefs) {
	const vertexDegrees = []

	for (let i = 0; i < adjMatrix.length; i++) {
		vertexDegrees.push(await getDegree(adjMatrix, i, nodeRefs.current[i]))
	}

	const temp = vertexDegrees.slice()
	const maxDegree = temp.sort()[temp.length - 1]
	return {
		graphDegree: maxDegree,
		vertexDegrees: vertexDegrees
	}
}

async function greedyGraphColoringInterface(nodes, setNodes, adjMatrix, nodeRefs) {
	const coloringResult = await greedyGraphColoring(adjMatrix, nodeRefs.current)

	const colors = []
	for (let i = 0; i < coloringResult.chromaticNumber; i++) {
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