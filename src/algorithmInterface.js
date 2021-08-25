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

function addEdge(graph, setGraph, edgeStart, edgeEnd) {
	const newGraph = graph.slice()
	newGraph[edgeStart][edgeEnd] = 1
	setGraph(newGraph)
}

export {initializeAdjecencyMatrix, addEdge}