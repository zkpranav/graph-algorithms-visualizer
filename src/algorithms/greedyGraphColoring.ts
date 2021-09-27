import { gsap } from 'gsap'

const tl = gsap.timeline()
async function nodeActive(node: HTMLElement) {
	return new Promise((resolve, reject) => {
		tl.to(node, {
			scale: 1.2,
			duration: 0.2,
			ease: 'Power1.easeInOut'
		})
		tl.to(node, {
			scale: 1,
			duration: 0.2,
			ease: 'Power1.easeInOut',
			onComplete: resolve
		})
	})
}


type AdjecencyMatrix = number[][]

async function greedyGraphColoring(adjMatrix: AdjecencyMatrix, nodeRefs: HTMLElement[]): Promise<{coloringSequence: number[], chromaticNumber: number}> {
    const coloringSequence = [1]
    // trigger animation for first vertex
    await nodeActive(nodeRefs[0])

    for (let i = 1; i < adjMatrix.length; i++) { 

        // Trigger animation
        await nodeActive(nodeRefs[i])
        
        let colorsUsed = coloringSequence.slice()
        for (let j = 0; j < i; j++) {
            if (adjMatrix[i][j] > 0) {
                const colorToRemove = coloringSequence[j]
                colorsUsed = colorsUsed.filter((color) => {
                    return color != colorToRemove
                })
            }
        }

        if (colorsUsed.length) {
            coloringSequence.push(colorsUsed[0])
        } else {
            coloringSequence.push(Math.max(...coloringSequence) + 1)
        }
    }

    let chromaticNumber = 1
    const noDuplicateColors = [coloringSequence[0]]

    for (let i = 1; i < coloringSequence.length; i++) {
        if (noDuplicateColors.includes(coloringSequence[i])) {
            continue
        } else {
            noDuplicateColors.push(coloringSequence[i])
        }
    }

    return {
        coloringSequence: coloringSequence,
        chromaticNumber: noDuplicateColors.length
    }
}

export default greedyGraphColoring