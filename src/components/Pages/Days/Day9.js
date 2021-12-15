import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { sumNumbers } from '../../../utils/helperFunctions'


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

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const grid = fileText.split('\n').map(el => el.split('').map(el => parseInt(el)))
    console.log('grid: ', grid)

    const getNeighborOrigins = (centerX, centerY, xMax, yMax) => {
        const result = []
        const diffs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        diffs.forEach(el => {
            const x = centerX + el[0]
            const y = centerY + el[1]
            if ((x >= 0 && x < xMax) && (y >= 0 && y < yMax)) {
                result.push([x, y])
            }
        })
        return result
    }

    const lowPoints = []

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const currentPoint = grid[y][x]
            const neighbors = getNeighborOrigins(x, y, grid[0].length, grid.length)
            if (neighbors
                .map(el => {
                    return grid[el[1]][el[0]]
                })
                .every(el => currentPoint < el)
            ) {
                lowPoints.push([y, x])
            }
        }
    }

    console.log('lowPoints: ', lowPoints)

    const partOne = lowPoints
        .map(el => grid[el[0]][el[1]])
        .map(el => el + 1).reduce(sumNumbers, 0)
    console.log('partOne: ', partOne)


    const basins = []

    const recursiveFindBasins = (y, x) => {
        const result = [[y, x]]
        const currentPoint = grid[y][x]
        const neighbors = getNeighborOrigins(x, y, grid[0].length, grid.length)

        neighbors.forEach(el => {
            const newPoint = grid[el[1]][el[0]]
            if (newPoint > currentPoint && newPoint !== 9) {
                const recursivePoints = recursiveFindBasins(el[1], el[0])
                result.push(...recursivePoints)
            }
        })

        return result
    }

    lowPoints.forEach(el => {
        const basin = recursiveFindBasins(el[0], el[1])
        basins.push(basin)
    })

    console.log('basins: ', basins)

    const uniqueBasins = []

    basins.forEach(el => {
        const tempGrid = grid.map(el => el.map(el => '*'))
        el.forEach(el => tempGrid[el[0]][el[1]] = 'X')
        // console.log(tempGrid.map(el => el.join('')).join('\n'))
        const uniques = []
        tempGrid.forEach((el, y) => el.forEach((el, x) => {
            if (el === 'X') uniques.push([y, x])
        }))
        uniqueBasins.push(uniques)
    })

    const largestBasins = uniqueBasins.sort((a, b) => b.length - a.length).slice(0, 3).map(el => el.length)
    console.log('largestBasins: ', largestBasins)

    const partTwo = largestBasins.reduce((total, value) => total * value, 1)
    console.log('partTwo: ', partTwo)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day