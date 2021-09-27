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

async function getDegree(adjMatrix: AdjecencyMatrix, vertexColumnPosition: number, node: HTMLElement): Promise<number> {
    if (!Number.isInteger(vertexColumnPosition) || vertexColumnPosition >= adjMatrix.length || vertexColumnPosition < 0) {
        return NaN
    }

    let degree: number = 0
    adjMatrix.forEach((possibleEdges) => {
        if (possibleEdges[vertexColumnPosition] > 0) {
            degree += 1
        }
    })

    await nodeActive(node)

    return degree
}

export default getDegree