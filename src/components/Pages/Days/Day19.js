import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { combinations, sortNumbersDescending } from '../../../utils/helperFunctions'

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

const taxiCabDistance = ({ x: ax, y: ay, z: az }, { x: bx, y: by, z: bz }) => {
    const xDistance = Math.abs(ax - bx)
    const yDistance = Math.abs(ay - by)
    const zDistance = Math.abs(az - bz)
    return xDistance + yDistance + zDistance
}

const findCommonBeacons = (sensorA, sensorB) => {
    let highestLength = 0
    let commonBeacons = [
        // list of A&B beacon pairs,
    ]
    outerLoop:
    for (let i = 0; i < sensorA.length; i++) {
        const aAnchorBeacon = sensorA[i]
        const aDistances = sensorA.map(el => taxiCabDistance(aAnchorBeacon, el))

        for (let j = 0; j < sensorB.length; j++) {
            const bAnchorBeacon = sensorB[j]
            const matchingBDistances = sensorB.map(el => taxiCabDistance(bAnchorBeacon, el))
                .filter(el => aDistances.includes(el))

            if (matchingBDistances.length === 12) {
                highestLength = matchingBDistances.length
                commonBeacons = []
                const bDistances = sensorB.map(el => taxiCabDistance(bAnchorBeacon, el))
                for (let bIndex = 0; bIndex < bDistances.length; bIndex++) {
                    const el = bDistances[bIndex]
                    const aIndex = aDistances.indexOf(el)
                    if (aIndex !== -1) {
                        commonBeacons.push([
                            sensorA[aIndex],
                            sensorB[bIndex],
                        ])
                    }
                }
                break outerLoop
            }
        }
    }
    if (highestLength === 12) {
        return commonBeacons
    }

}

const findBeaconTransform = (commonBeacons) => {
    let transform
    let anchorIndex = 0
    while (transform === undefined) {

        const anchorA = commonBeacons[anchorIndex][0]
        const anchorB = commonBeacons[anchorIndex][1]
        const anchoredCommonBeacons = commonBeacons.map(el => {
            const a = el[0]
            const b = el[1]
            return [
                {
                    x: a.x - anchorA.x,
                    y: a.y - anchorA.y,
                    z: a.z - anchorA.z,
                }, {
                    x: b.x - anchorB.x,
                    y: b.y - anchorB.y,
                    z: b.z - anchorB.z,
                },
            ]
        })
        // From B to A
        let xTransform
        let yTransform
        let zTransform
        for (let comparePoint = 0; comparePoint < commonBeacons.length; comparePoint++) {
            const [a, b] = anchoredCommonBeacons[comparePoint]
            if (b.x !== 0) {
                if (Math.abs(a.x) === Math.abs(b.x)) {
                    xTransform = ({ x, y, z }) => x * (a.x / b.x)
                } else if (Math.abs(a.x) === Math.abs(b.y)) {
                    xTransform = ({ x, y, z }) => y * (a.x / b.y)
                } else if (Math.abs(a.x) === Math.abs(b.z)) {
                    xTransform = ({ x, y, z }) => z * (a.x / b.z)
                }

                if (Math.abs(a.y) === Math.abs(b.x)) {
                    yTransform = ({ x, y, z }) => x * (a.y / b.x)
                } else if (Math.abs(a.y) === Math.abs(b.y)) {
                    yTransform = ({ x, y, z }) => y * (a.y / b.y)
                } else if (Math.abs(a.y) === Math.abs(b.z)) {
                    yTransform = ({ x, y, z }) => z * (a.y / b.z)
                }

                if (Math.abs(a.z) === Math.abs(b.x)) {
                    zTransform = ({ x, y, z }) => x * (a.z / b.x)
                } else if (Math.abs(a.z) === Math.abs(b.y)) {
                    zTransform = ({ x, y, z }) => y * (a.z / b.y)
                } else if (Math.abs(a.z) === Math.abs(b.z)) {
                    zTransform = ({ x, y, z }) => z * (a.z / b.z)
                }

                if (xTransform({ x: 1, y: 1, z: 1 }) === 1 || xTransform({ x: 1, y: 1, z: 1 }) === -1) {
                    break
                }
            }
        }
        const aTranslate = anchorA
        const bTranslate = anchorB

        if (xTransform !== undefined && yTransform !== undefined && zTransform !== undefined) {
            transform = ({ x, y, z }) => {
                return {
                    x: xTransform({ x, y, z }) + aTranslate.x - xTransform(bTranslate),
                    y: yTransform({ x, y, z }) + aTranslate.y - yTransform(bTranslate),
                    z: zTransform({ x, y, z }) + aTranslate.z - zTransform(bTranslate),
                }
            }
        }
        else anchorIndex++
    }
    return transform
}

const findAllCommonBeacons = scanners => {
    const commonBeaconsForAlignment = []
    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners.length; j++) {
            const scannerA = scanners[i]
            const scannerB = scanners[j]
            const commonBeacons = findCommonBeacons(scannerA, scannerB)
            if (commonBeacons) {
                commonBeaconsForAlignment.push({
                    anchorScanner: i,
                    secondScanner: j,
                    commonBeacons: commonBeacons,
                })
            }

        }
    }
    return commonBeaconsForAlignment
}

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const scanners = fileText.split('\n\n')
        .map(el => el.split('\n')
            .slice(1)
            .map(el => el.split(',')
                .map(el => parseInt(el))
            )
            .map(el => ({ x: el[0], y: el[1], z: el[2] }))
        )
    console.log('scanners: ', scanners)

    // const commonBeacons = findCommonBeacons(scanners[0], scanners[1])
    // const commonBeacons = findCommonBeacons(scanners[1], scanners[4])
    // console.log('commonBeacons: ', commonBeacons)

    // const transform = findBeaconTransform(commonBeacons)
    // console.log('transform({x: 0, y:0, z:0}): ', transform({ x: 1, y: 2, z: 3 }))

    // commonBeacons.forEach(el => {
    //     console.log('a: ', el[0])
    //     console.log('b: ', el[1])
    //     console.log('t: ', transform(el[1]))
    //     console.log('')
    // })

    const allCommonBeacons = findAllCommonBeacons(scanners)
    console.log('allCommonBeacons: ', allCommonBeacons)

    let knownScanners = [0]
    const steps = {}

    while (Object.keys(steps).length < scanners.length - 1) {
        allCommonBeacons
            .filter(el => knownScanners.includes(el.anchorScanner))
            .filter(el => !knownScanners.includes(el.secondScanner))
            .forEach(el => {
                knownScanners.push(el.secondScanner)
                const transform = findBeaconTransform(el.commonBeacons)
                steps[el.secondScanner] = { to: el.anchorScanner, transform: transform }
            })
    }

    console.log('steps: ', steps)

    // const alignedScanners = [
    //     scanners[0],
    // ]

    // for (let i = 1; i < scanners.length; i++) {
    //     let scanner = scanners[i]
    //     let currentCoordinateSystem = i
    //     while (currentCoordinateSystem !== 0) {
    //         scanner = scanner.map(el => steps[currentCoordinateSystem].transform(el))
    //         currentCoordinateSystem = steps[currentCoordinateSystem].to
    //     }
    //     alignedScanners.push(scanner)
    // }

    // const allAlignedBeacons = alignedScanners.flat().sort((a, b) => a.x - b.x)
    // const uniqueBeacons = new Set(allAlignedBeacons.map(el => el.x + ' / ' + el.y + ' / ' + el.z))
    // console.log('uniqueBeacons: ', uniqueBeacons)
    // console.log('partOne: ', uniqueBeacons.size)

    const scannerLocations = [
        { x: 0, y: 0, z: 0 }
    ]
    for (let i = 1; i < scanners.length; i++) {
        let scannerLocation = { x: 0, y: 0, z: 0 }
        let currentCoordinateSystem = i
        while (currentCoordinateSystem !== 0) {
            scannerLocation = steps[currentCoordinateSystem].transform(scannerLocation)
            currentCoordinateSystem = steps[currentCoordinateSystem].to
        }
        scannerLocations.push(scannerLocation)
    }

    const combos = combinations(scannerLocations, 2)
    const distances = combos.map(el => taxiCabDistance(el[0], el[1])).sort(sortNumbersDescending)
    console.log('partTwo: ', distances[0])


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day