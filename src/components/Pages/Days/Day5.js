import { makeStyles } from "@mui/styles"

import { CircularProgress } from "@mui/material"
import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Grid } from "../../Atoms"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"

import React from "react"

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

    const [grid, setGrid] = React.useState([])
    const [coordinates, setCoordinates] = React.useState([])

    React.useEffect(() => {
        if (fileText) {
            const grid = []
            for (let i = 0; i < 1000; i++) {
                grid[i] = []
                for (let j = 0; j < 1000; j++) {
                    grid[i][j] = 0
                }
            }
            setGrid(grid)

            const input = fileText.split('\n')
                .map(str => str.split(' -> '))
                .map(arr => {
                    return {
                        x1: parseInt(arr[0].split(',')[0]),
                        y1: parseInt(arr[0].split(',')[1]),
                        x2: parseInt(arr[1].split(',')[0]),
                        y2: parseInt(arr[1].split(',')[1]),
                    }
                })

            setCoordinates(input)
        }
    }, [fileText])

    const createLine = React.useCallback((el, previousGrid) => {
        const start = Math.min(el.x1, el.x2)
        const end = Math.max(el.x1, el.x2)
        const starty = Math.min(el.y1, el.y2)
        const endy = Math.max(el.y1, el.y2)

        if (el.x1 === el.x2 || el.y1 === el.y2) {
            for (let x = start; x <= end; x++) {
                for (let y = starty; y <= endy; y++) {
                    previousGrid[y][x] += 1
                }
            }
        } else {
            if (el.y1 < el.y2 && el.x1 < el.x2) {
                for (let i = 0; i <= el.x2 - el.x1; i++) {
                    previousGrid[el.y1 + i][el.x1 + i] += 1
                }
            }
            else if (el.y1 < el.y2 && el.x1 > el.x2) {
                for (let i = 0; i <= el.x1 - el.x2; i++) {
                    previousGrid[el.y1 + i][el.x1 - i] += 1
                }
            }
            else if (el.y1 > el.y2 && el.x1 < el.x2) {
                for (let i = 0; i <= el.x2 - el.x1; i++) {
                    previousGrid[el.y1 - i][el.x1 + i] += 1
                }
            }
            else if (el.y1 > el.y2 && el.x1 > el.x2) {
                for (let i = 0; i <= el.x1 - el.x2; i++) {
                    previousGrid[el.y1 - i][el.x1 - i] += 1
                }
            }
        }
        return previousGrid
    }, [])


    const [displayGrid, setDisplayGrid] = React.useState([])


    const nextFrame = React.useCallback((frameIndex) => {
        console.log('frameIndex: ', frameIndex)
        const instructions = coordinates.slice(0, frameIndex)
        let newGrid = grid.slice().map(el => el.slice())
        for (let i = 0; i < instructions.length; i++) {
            newGrid = createLine(instructions[i], newGrid)
        }
        setDisplayGrid(newGrid)
    }, [coordinates, createLine, grid])

    React.useEffect(() => {
        let frameIndex = 0
        const interval = setInterval(() => {
            nextFrame(frameIndex % coordinates.length)
            // nextFrame(61)
            frameIndex += 1
        }, 500)
        return () => clearInterval(interval)
    }, [nextFrame, coordinates])


    if (!fileText) return <CircularProgress color="primary" />
    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Grid
                    gridData={displayGrid.slice(0, 10).map(el => el.slice(0, 10))}
                    cellSize={50}
                    cellStyleCallback={el => ({ fontSize: 40 })}
                    cellContentCallback={el => el > 0 ? '🌋' : ''}
                />
            </div>

        </div>
    </div >
}

export default Day