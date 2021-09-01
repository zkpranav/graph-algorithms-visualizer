function greedyGraphColoring(adjMatrix) {
    const coloringSequence = [1];
    for (let i = 1; i < adjMatrix.length; i++) {
        let colorsUsed = coloringSequence.slice();
        for (let j = 0; j < i; j++) {
            if (adjMatrix[i][j] > 0) {
                const colorToRemove = coloringSequence[j];
                colorsUsed = colorsUsed.filter((color) => {
                    return color != colorToRemove;
                });
            }
        }
        if (colorsUsed.length) {
            coloringSequence.push(colorsUsed[0]);
        }
        else {
            coloringSequence.push(Math.max(...coloringSequence) + 1);
        }
    }
    let chromaticNumber = 1;
    const noDuplicateColors = [coloringSequence[0]];
    for (let i = 1; i < coloringSequence.length; i++) {
        if (noDuplicateColors.includes(coloringSequence[i])) {
            continue;
        }
        else {
            noDuplicateColors.push(coloringSequence[i]);
        }
    }
    return {
        coloringSequence: coloringSequence,
        chromaticNumber: noDuplicateColors.length
    };
}
export default greedyGraphColoring;
