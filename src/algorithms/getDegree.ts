type AdjecencyMatrix = number[][]

function getDegree(adjMatrix: AdjecencyMatrix, vertexColumnPosition: number): number {
    if (!Number.isInteger(vertexColumnPosition) || vertexColumnPosition >= adjMatrix.length || vertexColumnPosition < 0) {
        return NaN
    }

    let degree: number = 0
    adjMatrix.forEach((possibleEdges) => {
        if (possibleEdges[vertexColumnPosition] > 0) {
            degree += 1
        }
    })

    return degree
}

export default getDegree