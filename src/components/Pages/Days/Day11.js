import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { } from '../../../utils/helperFunctions'
import { Grid } from '../../Atoms'
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
    const [octoGrid, setOctoGrid] = React.useState([])

    React.useEffect(() => {
        if (fileText) {
            setOctoGrid(
                fileText.split('\n')
                    .map(el => el.split('').map(el => parseInt(el)))
            )
        }
    }, [fileText])

    const increaseByOne = grid => {
        const newGrid = grid.slice().map(el => el.slice().map(el => el + 1))
        return newGrid
    }

    const getNeighborOrigins = (centerX, centerY, xMax, yMax) => {
        const result = []
        const diffs = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1],]
        diffs.forEach(el => {
            const x = centerX + el[0]
            const y = centerY + el[1]
            if ((x >= 0 && x < xMax) && (y >= 0 && y < yMax)) {
                result.push([x, y])
            }
        })
        return result
    }

    const encodeXY = (x, y) => x + 100 * y
    const decodeXY = encoding => [encoding % 100, Math.floor(encoding / 100)]


    // let numberOfFlashes = 0
    const recursiveFlash = React.useCallback((grid, encodedFlashMemory = []) => {
        let newGrid = grid.slice().map(el => el.slice())
        const octopussiReadyToFlash = newGrid.map((row, y) => row.map((el, x) => {
            if (el > 9) return encodeXY(x, y)
            else return -1
        }).filter(el => el !== -1)).flat().filter(el => !encodedFlashMemory.includes(el))
        if (octopussiReadyToFlash.length > 0) {
            octopussiReadyToFlash.forEach(el => {
                // numberOfFlashes += 1
                const [x, y] = decodeXY(el)
                const neighbors = getNeighborOrigins(x, y, grid[0].length, grid.length)
                neighbors.forEach(([x, y]) => newGrid[y][x] += 1)
            })
            return recursiveFlash(newGrid, [...encodedFlashMemory, ...octopussiReadyToFlash])
        }

        return newGrid
    }, [])

    const resetEnergyLevels = grid => {
        let newGrid = grid.slice().map(el => el.slice().map(el => el > 9 ? 0 : el))
        return newGrid
    }

    const STOP_SIGNAL = 'STOP_SIGNAL'
    const progressOneStep = React.useCallback(grid => {
        if (grid.map(el => el.every(el => el === 0)).every(el => el)) {
            throw STOP_SIGNAL
        } else {
            let newGrid = grid.slice().map(el => el.slice())
            newGrid = increaseByOne(newGrid)
            newGrid = recursiveFlash(newGrid)
            newGrid = resetEnergyLevels(newGrid)
            return newGrid
        }
    }, [recursiveFlash])

    // let i = 0
    // for (i; i < 100; i++) {
    //     octoGrid = progressOneStep(octoGrid)
    // }
    // console.log('partOne: ', numberOfFlashes)

    // for (i; i < 1000; i++) {
    //     try {
    //         octoGrid = progressOneStep(octoGrid)
    //     } catch (error) {
    //         if (error === STOP_SIGNAL) break
    //     }
    // }
    // console.log('partTwo: ', i)


    const [displayGrid, setDisplayGrid] = React.useState([])
    const [displayStep, setDisplayStep] = React.useState(0)

    const nextFrame = React.useCallback((frameIndex) => {
        if (fileText) {
            console.log('frameIndex: ', frameIndex)
            const nextGrid = progressOneStep(octoGrid)
            // console.log('nextGrid: ', nextGrid)
            setOctoGrid(nextGrid)
            setDisplayGrid(nextGrid)
            setDisplayStep(displayStep + 1)
        }
    }, [fileText, octoGrid, progressOneStep, displayStep])

    React.useEffect(() => {
        let frameIndex = 0
        const interval = setInterval(() => {
            nextFrame(frameIndex)
            frameIndex += 1
        }, 1)
        return () => clearInterval(interval)
    }, [nextFrame, octoGrid, progressOneStep])

    if (!fileText) return <CircularProgress color="primary" />
    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <div>Current step: {displayStep}/242</div>
            <Grid
                gridData={displayGrid}
                cellSize={70}
                cellStyleCallback={el => ({ backgroundColor: el === 0 ? deepSaffron : 'transparent', fontSize: 50 })}
                cellContentCallback={() => '🐙'}
            />
        </div>
    </div >
}

export default Day