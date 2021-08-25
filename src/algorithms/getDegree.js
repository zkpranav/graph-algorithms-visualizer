function getDegree(adjMatrix, vertexColumnPosition) {
    if (!Number.isInteger(vertexColumnPosition) || vertexColumnPosition >= adjMatrix.length || vertexColumnPosition < 0) {
        return NaN;
    }
    let degree = 0;
    adjMatrix.forEach((possibleEdges) => {
        if (possibleEdges[vertexColumnPosition] > 0) {
            degree += 1;
        }
    });
    return degree;
}
export default getDegree;
