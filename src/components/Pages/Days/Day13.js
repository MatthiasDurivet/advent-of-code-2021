import { makeStyles } from "@mui/styles"
import { Box } from "@mui/system"
import { Button } from '@mui/material'

import { Grid } from '../../Atoms'
import { useFileTextEditor } from "../../Atoms/FileTextEditor"
import { FileTextEditor } from "../../Atoms"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"
import React from "react"
import { keyframes } from '@emotion/react'

import { sortNumbersDescending } from '../../../utils/helperFunctions'

const useStyles = makeStyles(() => ({
    dayContainer: {
        marginTop: 50,
        marginBottom: 50,
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

const exampleOne = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

const exampleTwo = `0,0
1,1
3,3
4,4
6,6
7,7
9,9
10,10

fold along y=5
fold along y=2
fold along x=5
fold along x=2`

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, setFileText] = useFileTextEditor(dayNumber)
    const [foldInstructions, setFoldInstructions] = React.useState(null)
    const [grid, setGrid] = React.useState(null)

    React.useEffect(() => {
        if (fileText) {

            try {

                const [a, b] = fileText.split('\n\n')
                const dots = a.split('\n')
                    .map(
                        el => el.split(',')
                            .map(el => parseInt(el))
                    )
                // setDots(dots)

                const rows = dots.map(el => el[1]).sort(sortNumbersDescending)[0] + 1
                const cols = dots.map(el => el[0]).sort(sortNumbersDescending)[0] + 1

                const foldInstructions = b.split('\n')
                    .map(
                        el => el.split('=')
                    )
                    .map(el => ({
                        value: parseInt(el[1]),
                        axis: el[0].slice(-1)[0],
                    }))

                setFoldInstructions(foldInstructions)

                const grid = []
                const row = ' '.repeat(cols)
                for (let i = 0; i < rows; i++) {
                    grid.push(row.split(''))
                }
                dots.forEach(el => {
                    const x = el[0]
                    const y = el[1]
                    grid[y][x] = 'O'
                })
                setGrid(grid)
            } catch {
                setGrid(null)
                setFoldInstructions(null)
            }
        }
    }, [fileText])

    // const [a, b] = fileText.split('\n\n')

    // const dots = a.split('\n')
    //     .map(
    //         el => el.split(',')
    //             .map(el => parseInt(el))
    //     )

    // const foldInstructions = b.split('\n')
    //     .map(
    //         el => el.split('=')
    //     )
    //     .map(el => ({
    //         value: parseInt(el[1]),
    //         axis: el[0].slice(-1)[0],
    //     }))

    // const fold = (dot, { value, axis }) => {
    //     if (axis === 'x') {
    //         if (dot[0] > value) {
    //             return [value * 2 - dot[0], dot[1]]
    //         } else {
    //             return dot
    //         }
    //     } else {
    //         if (dot[1] > value) {
    //             return [dot[0], value * 2 - dot[1]]
    //         } else {
    //             return dot
    //         }
    //     }
    // }

    // const foldedDots = dots.map(el => fold(el, foldInstructions[0]))

    // const partOne = new Set(foldedDots.map(el => el[0] + el[1] * 1000)).size
    // console.log('partOne: ', partOne)

    // let partTwo = dots
    // foldInstructions.forEach(instruction => {
    //     partTwo = partTwo.map(dot => fold(dot, instruction))
    // })

    // let grid = []
    // const row = ' '.repeat(39)
    // for (let i = 0; i < 6; i++) {
    //     grid.push(row.split(''))
    // }
    // partTwo.forEach(el => {
    //     const x = el[0]
    //     const y = el[1]
    //     grid[y][x] = 'O'
    // })
    // console.log('partTwo')
    // console.log(grid.map(el => el.join('')).join('\n'))



    if (!fileText || !grid || !foldInstructions) {
        return (<div>
            <Header />
            <Background />
            <div className={classes.dayContainer}>
                <div style={{ width: '70vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 50, }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: 10 }}>
                        <Button
                            color='primary'
                            variant='outlined'
                            fullWidth
                            onClick={() => {
                                setFileText('')
                                setTimeout(() => setFileText(fileText), 1)
                            }}
                        >Reload</Button>
                        <Button
                            color='primary'
                            variant='outlined'
                            fullWidth
                            onClick={() => {
                                setFileText('')
                                setTimeout(() => setFileText(exampleOne), 1)
                            }}
                        >Load example #1</Button>
                        <Button
                            color='primary'
                            variant='outlined'
                            fullWidth
                            onClick={() => {
                                setFileText('')
                                setTimeout(() => setFileText(exampleTwo), 1)
                            }}
                        >Load example #2</Button>
                    </div>
                    <FileTextEditor key='textEditor' fileText={fileText} setFileText={setFileText} />
                    <div>
                        <CircularProgress color="primary" />
                    </div>
                </div>
            </div>
        </div >)
    }

    const animationLookupTable = {
        'y': keyframes({
            from: { transform: 'rotateX(0deg)' },
            to: { transform: 'rotateX(180deg)' },
        }),
        'x': keyframes({
            from: { transform: 'rotateY(0deg)' },
            to: { transform: 'rotateY(180deg)' },
        }),
    }

    const dummyAnimation = keyframes({
        from: {},
        to: {},
    })


    let originalHalf = {
        grid: grid,
        // subfolds: [],
        animation: dummyAnimation,
        isLeaf: true,
        yOperations: 0,
        xOperations: 0,
        xMirrored: false,
        yMirrored: false,
        yOverflow: 0,
        isXOrigin: true,
        isYOrigin: true,
    }


    const recursiveMap = (half, instruction) => {
        if (instruction.axis === 'y') {
            let endOfFirstSlice
            if (!half.yMirrored) {
                endOfFirstSlice = instruction.value + half.yOverflow
            } else {
                endOfFirstSlice = (half.grid.length - 1) - (instruction.value + half.yOverflow)
            }
            return {
                ...half,
                yOperations: half.yOperations + 1,
                xOperations: half.xOperations,
                isLeaf: false,
                subfolds: !half.isLeaf
                    ? half.subfolds.map(half => recursiveMap(half, instruction))
                    : [
                        {
                            grid: half.grid.slice(0, endOfFirstSlice),
                            yOverflow: 0,
                            animation: half.yMirrored
                                ? animationLookupTable['y']
                                : dummyAnimation,
                            isLeaf: true,
                            yOperations: 0,
                            xOperations: 0,
                            xMirrored: half.xMirrored,
                            yMirrored: half.yMirrored,
                            transformOrigin: 'bottom right',
                            isXOrigin: half.isXOrigin,
                            isYOrigin: half.isYOrigin,
                        },
                        {
                            grid: half.grid.slice(endOfFirstSlice + 1),
                            yOverflow: (half.grid.length - 1 - instruction.value) - instruction.value,
                            animation: half.yMirrored
                                ? dummyAnimation
                                : animationLookupTable['y'],
                            isLeaf: true,
                            yOperations: 0,
                            xOperations: 0,
                            xMirrored: half.xMirrored,
                            yMirrored: !half.yMirrored,
                            transformOrigin: 'top left',
                            isXOrigin: half.isXOrigin,
                            isYOrigin: false,
                        },
                    ],
            }
        }
        else {
            return {
                ...half,
                yOperations: half.yOperations,
                xOperations: half.xOperations + 1,
                isLeaf: false,
                subfolds: !half.isLeaf
                    ? half.subfolds.map(half => recursiveMap(half, instruction))
                    : [
                        {
                            grid: half.grid.map(el => el.slice(0, instruction.value)),
                            animation: half.xMirrored
                                ? animationLookupTable['x']
                                : dummyAnimation,
                            isLeaf: true,
                            yOperations: 0,
                            xOperations: 0,
                            xMirrored: half.xMirrored,
                            yMirrored: half.yMirrored,
                            transformOrigin: 'bottom right',
                            isXOrigin: half.isXOrigin,
                            isYOrigin: half.isYOrigin,
                        },
                        {
                            grid: half.grid.map(el => el.slice(instruction.value + 1)),
                            animation: half.xMirrored
                                ? dummyAnimation
                                : animationLookupTable['x'],
                            isLeaf: true,
                            yOperations: 0,
                            xOperations: 0,
                            xMirrored: !half.xMirrored,
                            yMirrored: half.yMirrored,
                            transformOrigin: 'top left',
                            isXOrigin: false,
                            isYOrigin: half.isYOrigin,
                        },
                    ],
            }
        }
    }

    foldInstructions.forEach(instruction => {
        originalHalf = recursiveMap(originalHalf, instruction)
    })

    const cellSize = 50

    const lookupTable = {
        0: 0,
        1: 1,
        2: 3,
        3: 7,
        4: 15,
    }

    for (let i = 1; i < 10; i++) {
        lookupTable[i] = lookupTable[i - 1] * 2 + 1
    }

    const recursiveAnimatedElement = (half, index = 0) => {
        const rowsLostToYOperations = lookupTable[half.yOperations]
        const colsLostToXOperations = lookupTable[half.xOperations]

        return (
            <Box
                sx={{
                    display: 'inline-block',
                    animationName: `${half.animation}`,
                    animationDuration: '4s',
                    animationTimingFunction: 'ease-in-out',
                    animationFillMode: 'both',
                    animationDelay: `${index * 4}s`,
                    // animationDelay: '1000s',
                    transformOrigin: half.transformOrigin,
                    width: (half.grid.length > 0 ? half.grid[0].length - colsLostToXOperations : 0) * cellSize,
                    height: (half.grid.length - rowsLostToYOperations) * cellSize,
                    verticalAlign: 'top',
                }}>
                {half.isLeaf
                    ? <React.Fragment>
                        <Grid
                            gridData={half.grid}
                            cellSize={cellSize}
                            cellContentCallback={el => el === 'O' ? '🟧' : ' '}
                            cellStyleCallback={(el, grid, x, y) => {
                                return ({
                                    ...((y === 0 && !half.isYOrigin) ? { borderTopColor: deepSaffron } : {}),
                                    ...((x === 0 && !half.isXOrigin) ? { borderLeftColor: deepSaffron } : {}),
                                })
                            }}
                        />
                    </React.Fragment>
                    : <React.Fragment>
                        {recursiveAnimatedElement(half.subfolds[0], index + 1)}
                        {recursiveAnimatedElement(half.subfolds[1], index + 1)}
                    </React.Fragment>
                }
            </Box>
        )
    }

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <div style={{ width: '70vw', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 50, }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: 10 }}>
                    <Button
                        color='primary'
                        variant='outlined'
                        fullWidth
                        onClick={() => {
                            setFileText('')
                            setTimeout(() => setFileText(fileText), 1)
                        }}
                    >Reload</Button>
                    <Button
                        color='primary'
                        variant='outlined'
                        fullWidth
                        onClick={() => {
                            setFileText('')
                            setTimeout(() => setFileText(exampleOne), 1)
                        }}
                    >Load example #1</Button>
                    <Button
                        color='primary'
                        variant='outlined'
                        fullWidth
                        onClick={() => {
                            setFileText('')
                            setTimeout(() => setFileText(exampleTwo), 1)
                        }}
                    >Load example #2</Button>
                </div>
                <FileTextEditor key='textEditor' fileText={fileText} setFileText={setFileText} />
                <div>
                    {recursiveAnimatedElement(originalHalf)}
                </div>
            </div>
        </div>
    </div >
}

export default Day