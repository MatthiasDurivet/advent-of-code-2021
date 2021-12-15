import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Grid } from "../../Atoms"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

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
    const [boards, setBoards] = React.useState([])
    const [drawnNumbers, setDrawnNumbers] = React.useState([])

    React.useEffect(() => {

        if (fileText) {
            const inputs = fileText.split('\n\n')

            let [drawnNumbers, ...boards] = inputs

            setDrawnNumbers(drawnNumbers.split(',').map(el => parseInt(el)))

            setBoards(boards.map(el => el.split('\n').map(row => ([
                parseInt(row.slice(0, 3)),
                parseInt(row.slice(3, 6)),
                parseInt(row.slice(6, 9)),
                parseInt(row.slice(9, 12)),
                parseInt(row.slice(12, 15)),
            ]))))
        }
    }, [fileText])

    const checkBingo = (grid, drawnNumbersSubset) => {
        for (let x = 0; x < grid.length; x++) {
            if (grid[x].map(el => drawnNumbersSubset.includes(el)).every(el => el)) return true
        }
        for (let y = 0; y < grid[0].length; y++) {
            if (grid.map(row => drawnNumbersSubset.includes(row[y])).every(el => el)) return true
        }

        return false
    }

    const [displayBoard, setDisplayBoard] = React.useState([])
    const [displayDrawnNumbers, setDisplayDrawnNumbers] = React.useState([])
    const [cellStyleFunction, setCellStyleFunction] = React.useState(() => { })
    const [gridBingo, setGridBingo] = React.useState([])

    const nextFrame = React.useCallback((frameIndex) => {
        console.log('frameIndex: ', frameIndex)
        setDisplayBoard(boards)
        setDisplayDrawnNumbers(drawnNumbers.slice(0, frameIndex % drawnNumbers.length))
        setCellStyleFunction(() => (element) => {
            return {
                color: drawnNumbers.slice(0, frameIndex % drawnNumbers.length).includes(element) ? deepSaffron : white,
            }
        })
        setGridBingo(boards.map(grid => checkBingo(grid, drawnNumbers.slice(0, frameIndex % drawnNumbers.length))))
    }, [boards, drawnNumbers])

    React.useEffect(() => {
        let frameIndex = 0
        const interval = setInterval(() => {
            nextFrame(frameIndex)
            frameIndex += 1
        }, 500)
        return () => clearInterval(interval)
    }, [nextFrame])

    if (!fileText) return <CircularProgress color="primary" />
    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <div style={{ margin: 50 }}>
                {displayDrawnNumbers.join(', ')}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', width: '50vw', flexWrap: 'wrap', rowGap: 50, columnGap: 50 }}>
                {
                    displayBoard.map((gridData, gridIndex) => (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            {gridBingo[gridIndex] &&
                                <p style={{ color: deepSaffron }}>BINGO!!!</p>
                            }
                            <Grid gridData={gridData} cellStyleCallback={cellStyleFunction} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div >
}

export default Day