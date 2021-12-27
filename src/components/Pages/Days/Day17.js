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

const checkTargetArea = ([startX, startY], [initialXVelocity, initialYVelocity], targetArea) => {
    let x = startX
    let y = startY
    let xVelocity = initialXVelocity
    let yVelocity = initialYVelocity
    const xMin = targetArea[0].min
    const xMax = targetArea[0].max
    const yMin = targetArea[1].min
    const yMax = targetArea[1].max
    let highestY = y
    while (Math.abs(x) <= Math.abs(xMax) && y >= yMin) {
        // console.log('xVelocity: ', xVelocity)
        // console.log('yVelocity: ', yVelocity)
        // console.log('xMin: ', xMin)
        // console.log('xMax: ', xMax)
        // console.log('yMin: ', yMin)
        // console.log('yMax: ', yMax)
        if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) return [initialXVelocity, initialYVelocity, highestY]
        x += xVelocity
        y += yVelocity

        if (xVelocity > 0) xVelocity -= 1
        if (xVelocity < 0) xVelocity += 1
        yVelocity -= 1

        if (y > highestY) highestY = y
    }
    return false
}

const iterateOptions = (startPosition, targetArea) => {
    const results = []
    for (let x = 0; x <= targetArea[0].max; x++) {
        for (let y = targetArea[1].min; y <= 1000; y++) {
            const result = checkTargetArea(startPosition, [x, y], targetArea)
            if (result) results.push(result)
        }
    }
    return results
}

// const findX = (startPosition, targetArea) => {
//     const results = []
//     const y = 9
//     for (let x = 100; x >= 0; x--) {
//         const result = checkTargetArea(startPosition, [x, y], targetArea)
//         if (result) results.push(result)
//     }
//     return results
// }

// const findY = (startPosition, targetArea) => {
//     const results = []
//     const x = 6
//     for (let y = 1000; y >= -1000; y--) {
//         const result = checkTargetArea(startPosition, [x, y], targetArea)
//         if (result) results.push(result)
//     }
//     return results
// }

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const startPosition = [0, 0]
    const targetArea = fileText.substring(13).split(', ')
        .map(el => ({
            axis: el[0],
            min: parseInt(el.substring(2).split('..')[0]),
            max: parseInt(el.substring(2).split('..')[1]),
        })
        )

    console.log('targetArea: ', targetArea)

    const encodeOrigin = (x, y) => x + 'x' + y

    const result = new Set(iterateOptions(startPosition, targetArea).map(el => encodeOrigin(el[0], el[1])))
    console.log('result: ', result)
    console.log('result: ', result.size)
    // if (result) {
    //     const [x, y, partOne] = result
    //     console.log('x: ', x)
    //     console.log('y: ', y)
    //     console.log('partOne: ', partOne)
    // }

    // const possibleXs = findX(startPosition, targetArea)
    // console.log('possibleXs: ', possibleXs)

    // const possibleYs = findY(startPosition, targetArea)
    // console.log('possibleYs: ', possibleYs)

    // console.log('partTwo: ', possibleXs.length * possibleYs.length)




    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day