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

const getNeighborOrigins = (centerX, centerY, xMax, yMax) => {
    const result = []
    const diffs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    diffs.forEach(el => {
        const x = centerX + el[0]
        const y = centerY + el[1]
        if ((x >= 0 && x < xMax) && (y >= 0 && y < yMax)) {
            result.push({ x: x, y: y })
        }
    })
    return result
}

const encodeOrigin = ({ x, y }) => x * 10000 + y

const breadthFirstSearch = (grid, start, goal) => {
    const alreadyVisited = []
    const explorationQueue = []
    explorationQueue.push({ ...start, totalDanger: 0, danger: 0 })
    alreadyVisited.push(encodeOrigin(start))
    while (explorationQueue.length > 0) {
        explorationQueue.sort((a, b) => a.totalDanger - b.totalDanger)
        const element = explorationQueue.shift()
        alreadyVisited.push(encodeOrigin(element))
        console.log('element.x + " " + element.y: ', element.x + " " + element.y)
        if (element.x === goal.x && element.y === goal.y) {
            return element.totalDanger
        }
        else {
            const neighbors = getNeighborOrigins(element.x, element.y, grid.length, grid[0].length)
            for (const neighbor of neighbors) {
                if (!alreadyVisited.includes(encodeOrigin(neighbor))) {
                    alreadyVisited.push(encodeOrigin(neighbor))
                    const danger = grid[neighbor.y][neighbor.x]
                    explorationQueue.push({
                        ...neighbor,
                        totalDanger: element.totalDanger + danger,
                    })
                }
            }
        }
    }
}

const doIncrement = (number, increment) => (number + increment) > 9 ? (number + increment) % 9 : (number + increment)

const rowWithIncrement = (row, increment) => {
    return row.map(el => doIncrement(el, increment))
}

const gridWithIncrement = (grid, increment) => {
    return grid.map(el => el.map(el => doIncrement(el, increment)))
}

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const grid = fileText.split('\n')
        .map(el => el.split('').map(el => parseInt(el)))

    console.log('grid: ', grid)

    const lowestDanger = breadthFirstSearch(grid, { x: 0, y: 0 }, { x: grid[0].length - 1, y: grid.length - 1 })
    console.log('partOne: ', lowestDanger)

    let repeatedGrid = [
        ...grid,
        ...gridWithIncrement(grid, 1),
        ...gridWithIncrement(grid, 2),
        ...gridWithIncrement(grid, 3),
        ...gridWithIncrement(grid, 4),
    ]

    repeatedGrid = repeatedGrid.map(row => ([
        ...row,
        ...rowWithIncrement(row, 1),
        ...rowWithIncrement(row, 2),
        ...rowWithIncrement(row, 3),
        ...rowWithIncrement(row, 4),
    ]))

    console.log('repeatedGrid ready')

    const lowestDangerForRepeatedGrid = breadthFirstSearch(repeatedGrid, { x: 0, y: 0 }, { x: repeatedGrid[0].length - 1, y: repeatedGrid.length - 1 })
    console.log('partTwo: ', lowestDangerForRepeatedGrid)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day