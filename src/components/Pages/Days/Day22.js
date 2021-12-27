import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

const useStyles = makeStyles(() => ({
    dayContainer: {
        marginTop: 50,
        marginBottom: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: white,
    },
    externalLink: {
        color: deepSaffron
    },
}))

// const difference = (setA, setB) => {
//     let _difference = new Set(setA)
//     for (let elem of setB) {
//         _difference.delete(elem)
//     }
//     return _difference
// }

// const union = (setA, setB) => {
//     let _union = new Set(setA)
//     for (let elem of setB) {
//         _union.add(elem)
//     }
//     return _union
// }

// const getAllCubes = instruction => {
//     const result = new Set()
//     let x = instruction.from.x
//     let y = instruction.from.y
//     let z = instruction.from.z
//     while (x <= instruction.to.x) {
//         y = instruction.from.y
//         while (y <= instruction.to.y) {
//             z = instruction.from.z
//             while (z <= instruction.to.z) {
//                 result.add(`${x}/${y}/${z}`)
//                 z++
//             }
//             y++
//         }
//         x++
//     }
//     return result
// }

// const updateListOfActiveCubes = (cubes, instruction) => {
//     if (instruction.mode === 'on') {
//         return union(cubes, getAllCubes(instruction))
//     } else {
//         return difference(cubes, getAllCubes(instruction))
//     }
// }

// const encodeRange = range => range.from.x + '->' + range.to.x + '/' + range.from.y + '->' + range.to.y + '/' + range.from.z + '->' + range.to.z
// const decodeRange = encoding => {
//     const coordinates = encoding.split('/').map(el => el.split('->').map(el => parseInt(el)))
//     return {
//         from: {
//             x: coordinates[0][0],
//             y: coordinates[1][0],
//             z: coordinates[2][0],
//         },
//         to: {
//             x: coordinates[0][1],
//             y: coordinates[1][1],
//             z: coordinates[2][1],
//         }
//     }
// }

// const printRange = range => {
//     console.log(encodeRange(range))
// }

// const getBreakpoints = (aStart, aEnd, bStart, bEnd) => {
//     const breakpoints = []

//     if (bStart > aStart && bStart < aEnd) {             // bStart inside A
//         breakpoints.push([aStart, bStart - 1])
//         if (bEnd < aEnd) {                              // bEnd inside A
//             breakpoints.push([bStart, bEnd])
//             breakpoints.push([bEnd + 1, aEnd])
//         } else if (bEnd > aEnd) {                       // bEnd outside A
//             breakpoints.push([bStart, aEnd])
//         } else if (bEnd === aEnd) {                     // bEnd borders A
//             breakpoints.push([bStart, aEnd])
//         }
//     } else if (bStart < aStart || bStart > aEnd) {      // bStart outside A

//         if (bEnd > aStart && bEnd < aEnd) {             // bEnd inside A
//             breakpoints.push([aStart, bEnd])
//             breakpoints.push([bEnd + 1, aEnd])
//         } else if (bEnd < aStart || bEnd > aEnd) {     // bEnd outside A
//             breakpoints.push([aStart, aEnd])
//         } else if (bEnd === aStart && bEnd === aEnd) { // bEnd borders aStart and aEnd
//             breakpoints.push([aStart, aEnd])
//         } else if (bEnd === aStart) {                   // bEnd borders aStart
//             breakpoints.push([aStart, bEnd])
//             breakpoints.push([bEnd + 1, aEnd])
//         } else if (bEnd === aEnd) {                     // bEnd borders aEnd
//             breakpoints.push([aStart, aEnd])
//         }
//     } else if (bStart === aStart) {                     // bStart borders aStart

//         if (bEnd < aEnd) {                              // bEnd inside A
//             breakpoints.push([bStart, bEnd])
//             breakpoints.push([bEnd + 1, aEnd])
//         } else if (bEnd === aEnd) {                     // bEnd borders aEnd
//             breakpoints.push([aStart, aEnd])
//         } else if (bEnd > aEnd) {                       // bEnd outside A
//             breakpoints.push([aStart, aEnd])

//         }
//     } else if (bStart === aEnd) {                       // bStart borders aEnd
//         breakpoints.push([aStart, bStart - 1])
//         breakpoints.push([bStart, aEnd])
//     }


//     return breakpoints
// }

// const getSubrangesOfOneCube = (cubeA, cubeB) => {
//     // Divide the combined cube into 4*4*4 ranges
//     // One cube will have 3*3*3 ranges
//     // Negative ranges are excluded
//     const xBreakpoints = getBreakpoints(cubeA.from.x, cubeA.to.x, cubeB.from.x, cubeB.to.x)
//     const yBreakpoints = getBreakpoints(cubeA.from.y, cubeA.to.y, cubeB.from.y, cubeB.to.y)
//     const zBreakpoints = getBreakpoints(cubeA.from.z, cubeA.to.z, cubeB.from.z, cubeB.to.z)

//     const xLen = xBreakpoints.length
//     const yLen = yBreakpoints.length
//     const zLen = zBreakpoints.length
//     let intersectionRanges = []
//     let zIndex = 0
//     while (zIndex < zLen) {
//         let yIndex = 0
//         while (yIndex < yLen) {
//             let xIndex = 0
//             while (xIndex < xLen) {
//                 intersectionRanges.push({
//                     from: {
//                         x: xBreakpoints[xIndex][0],
//                         y: yBreakpoints[yIndex][0],
//                         z: zBreakpoints[zIndex][0],
//                     },
//                     to: {
//                         x: xBreakpoints[xIndex][1],
//                         y: yBreakpoints[yIndex][1],
//                         z: zBreakpoints[zIndex][1],
//                     }
//                 })
//                 xIndex++
//             }
//             yIndex++
//         }
//         zIndex++
//     }

//     const rangesOfCubeA = intersectionRanges
//         .filter(el => {
//             const positiveX = el.from.x <= el.to.x
//             const positiveY = el.from.y <= el.to.y
//             const positiveZ = el.from.z <= el.to.z
//             if (!(positiveX && positiveY && positiveZ)) {
//                 console.log('bad breakpoints')
//                 console.log('cubeA: ', cubeA)
//                 console.log('cubeB: ', cubeB)
//             }
//             return positiveX && positiveY && positiveZ
//         })
//     return rangesOfCubeA
// }



// const getAllSubRangesOfTwoCubes = (cubeA, cubeB) => {
//     return [
//         getSubrangesOfOneCube(cubeA, cubeB),
//         getSubrangesOfOneCube(cubeB, cubeA),
//     ]
// }

// const updateListOfActiveRanges = (cubeRanges, instruction) => {
//     if (instruction.mode === 'on') {
//         const otherRanges = cubeRanges.map(el => {
//             const [a, b] = getAllSubRangesOfTwoCubes(el, instruction)
//             const setA = new Set(a.map(el => encodeRange(el)))
//             const setB = new Set(b.map(el => encodeRange(el)))
//             const result = difference(setA, setB)
//             return Array.from(result).map(el => decodeRange(el))
//         }).flat()
//         const newRange = instruction
//         return [...otherRanges, newRange]
//     } else {
//         return cubeRanges.map(el => {
//             const [a, b] = getAllSubRangesOfTwoCubes(el, instruction)
//             const setA = new Set(a.map(el => encodeRange(el)))
//             const setB = new Set(b.map(el => encodeRange(el)))
//             const result = difference(setA, setB)
//             return Array.from(result).map(el => decodeRange(el))
//         }).flat()
//     }
// }

// const calculateVolumeOfInclusiveRange = el => ((el.to.x - el.from.x + 1) * (el.to.y - el.from.y + 1) * (el.to.z - el.from.z + 1))
// const calculateVolumeOfExclusiveRange = el => ((el.to.x - el.from.x) * (el.to.y - el.from.y) * (el.to.z - el.from.z))

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    // const instructions = fileText.split('\n').slice(0)
    //     .map(el => {
    //         const mode = el.split(' ')[0]
    //         const coordinates = el.split(' ')[1].split(',').map(el => el.substring(2).split('..'))
    //         return {
    //             from: {
    //                 x: parseInt(coordinates[0][0]),
    //                 y: parseInt(coordinates[1][0]),
    //                 z: parseInt(coordinates[2][0]),
    //             },
    //             to: {
    //                 x: parseInt(coordinates[0][1]),
    //                 y: parseInt(coordinates[1][1]),
    //                 z: parseInt(coordinates[2][1]),
    //             },
    //             mode: mode,
    //         }
    //     })
    // console.log('instructions: ', instructions)

    // // Cube format: {x,y,z}
    // let activeCubes = new Set()
    // instructions.forEach(el => {
    //     activeCubes = updateListOfActiveCubes(activeCubes, el)
    // })
    // console.log('partOne: ', activeCubes.size)

    // let activeCubeRanges = []
    // instructions.forEach((el, index) => {
    //     console.log('processed instruction #', index)
    //     activeCubeRanges = updateListOfActiveRanges(activeCubeRanges, el)
    // })

    // const amountOfActiveCubes = activeCubeRanges
    //     .reduce((total, el) => total + calculateVolumeOfInclusiveRange(el), 0)
    // console.log('partTwo: ', amountOfActiveCubes)

    const instructions = [
        ...fileText.matchAll(/(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g),
    ].map((row) => [...row.slice(2, 8), row[1] === "on" ? 1 : 0].map(Number));

    const map = [], nMap = [], max = Math.max, min = Math.min;

    for (const [xMin1, xMax1, yMin1, yMax1, zMin1, zMax1, s1,] of instructions) {
        for (const [xMin2, xMax2, yMin2, yMax2, zMin2, zMax2, s2] of map) {
            const xMin = max(xMin1, xMin2), xMax = min(xMax1, xMax2);
            if (xMin > xMax) continue;
            const yMin = max(yMin1, yMin2), yMax = min(yMax1, yMax2);
            if (yMin > yMax) continue;
            const zMin = max(zMin1, zMin2), zMax = min(zMax1, zMax2);
            if (zMin > zMax) continue;
            nMap.push([xMin, xMax, yMin, yMax, zMin, zMax, s2 === 1 ? 0 : 1]);
        }
        map.push(...nMap);
        nMap.length = 0;
        if (s1) map.push([xMin1, xMax1, yMin1, yMax1, zMin1, zMax1, 1]);
    }

    const volume = map.reduce((acc, [x1, x2, y1, y2, z1, z2, s]) =>
        acc + (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1) * (s === 1 ? 1 : -1)
        , 0)

    console.log('volume: ', volume)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day