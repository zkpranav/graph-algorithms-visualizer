function isComplete(adjMatrix) {
    for (let i = 0; i < adjMatrix.length; i++) {
        for (let j = 0; j < adjMatrix.length; j++) {
            if (i == j) {
                if (adjMatrix[i][j] != 0) {
                    return false;
                }
            }
            else {
                if (!(adjMatrix[i][j] > 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}
export default isComplete;
