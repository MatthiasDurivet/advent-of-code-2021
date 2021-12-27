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

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const simulateMovement = (eastFacing, southFacing, xMax, yMax) => {
    let amountOfMoves = 0
    const newEastFacing = eastFacing.map((row, myY) => {
        return row.map(myX => {
            const nextX = (myX + 1) % (xMax + 1)
            const potentialCollisions = [
                ...eastFacing[myY].filter(otherX => otherX === nextX),
                ...southFacing[nextX].filter(otherY => otherY === myY),
            ]
            if (potentialCollisions.length === 0) {
                amountOfMoves += 1
                return nextX
            }
            else return myX
        })
    })
    const newSouthFacing = southFacing.map((col, myX) => {
        return col.map(myY => {
            const nextY = (myY + 1) % (yMax + 1)
            const potentialCollisions = [
                ...southFacing[myX].filter(otherY => otherY === nextY),
                ...newEastFacing[nextY].filter(otherX => otherX === myX)
            ]
            if (potentialCollisions.length === 0) {
                amountOfMoves += 1
                return nextY
            }
            else return myY
        })
    })
    return [newEastFacing, newSouthFacing, amountOfMoves]
}

// const printCucumbers = (east, south, xMax, yMax) => {
//     let grid = ('.'.repeat(xMax + 1) + '\n').repeat(yMax + 1)
//     east.forEach((row, y) => {
//         row.forEach(x => {
//             const yOffset = (xMax + 2) * y
//             const xOffset = x
//             grid = grid.substring(0, yOffset + xOffset) + '>' + grid.substring(yOffset + xOffset + 1)
//         })
//     })
//     south.forEach((col, x) => {
//         col.forEach(y => {
//             const yOffset = (xMax + 2) * y
//             const xOffset = x
//             grid = grid.substring(0, yOffset + xOffset) + 'v' + grid.substring(yOffset + xOffset + 1)
//         })
//     })
//     console.log(grid)
// }

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const eastFacingCucumbers = fileText.split('\n')
        .map(el => el.split('')
            .map((el, x) => el === '>' ? x : null)
            .filter(el => el !== null)
        )

    const southFacingCucumbers = transpose(fileText.split('\n')
        .map((el, y) => el.split('')
            .map(el => el === 'v' ? y : null)
        )
    ).map(row => row.filter(el => el !== null))

    const xMax = southFacingCucumbers.length - 1
    const yMax = eastFacingCucumbers.length - 1
    console.log('xMax: ', xMax)
    console.log('yMax: ', yMax)

    let [movingEast, movingSouth] = [eastFacingCucumbers, southFacingCucumbers]

    let step = 1
    while (step < 1000) {
        let result = simulateMovement(movingEast, movingSouth, xMax, yMax)
        movingEast = result[0]
        movingSouth = result[1]
        if (result[2] === 0) {
            console.log('step: ', step)
            break
        }
        step++
    }
    console.log('END')


    // let step = 0
    // while (step < 1) {
    //     [movingEast, movingSouth] = simulateMovement(movingEast, movingSouth, xMax, yMax)
    //     step++
    // }
    // console.log('partOne: ', step)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day