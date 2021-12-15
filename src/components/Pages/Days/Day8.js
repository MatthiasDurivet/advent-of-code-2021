import { makeStyles } from "@mui/styles"
import React from "react"

// import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Grid } from '../../Atoms'
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
// import { CircularProgress } from "@mui/material"

import { permutations } from '../../../utils/helperFunctions'

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
    // const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    // const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    // if (!fileText) return <CircularProgress color="primary" />

    // const input = fileText.split('\n')
    //     .map(el => el.split(' | '))
    //     .map(el => ({ input: el[0].split(' '), output: el[1].split(' '), }))

    // const stringSharesEverythingWithString = (a, b) => {
    //     if (a === undefined || b === undefined) return false
    //     return a.split('').every(el => b.includes(el))
    // }

    // const decodeSignal = signal => {
    //     const signalsInOrder = [
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //     ]

    //     console.log('signal.input: ', signal.input)
    //     const countInstances = (string, word) => {
    //         return string.split(word).length - 1
    //     }
    //     const allSignals = signal.input.join('')
    //     const presentCount = 'abcdefg'.split('').map(el => countInstances(allSignals, el))
    //     console.log('presentCount: ', presentCount)
    //     const mostCommonLine = 'abcdefg'[presentCount.findIndex(el => el === 9)]
    //     signal.input.forEach(el => {
    //         if (!el.includes(mostCommonLine)) signalsInOrder[2] = el
    //     })

    //     signal.input.forEach(() => {
    //         signal.input.forEach(el => {
    //             if (el.length === 2) signalsInOrder[1] = el
    //             if (el.length === 4) signalsInOrder[4] = el
    //             if (el.length === 3) signalsInOrder[7] = el
    //             if (el.length === 7) signalsInOrder[8] = el
    //             if (el.length === 6 && stringSharesEverythingWithString(signalsInOrder[4], el)) signalsInOrder[9] = el
    //             else if (el.length === 6 && stringSharesEverythingWithString(signalsInOrder[7], el)) signalsInOrder[0] = el
    //             else if (el.length === 6) signalsInOrder[6] = el
    //             else if (el.length === 5 && stringSharesEverythingWithString(signalsInOrder[1], el)) signalsInOrder[3] = el
    //         })
    //     })

    //     signal.input.forEach(el => {
    //         if (!signalsInOrder.includes(el)) signalsInOrder[5] = el
    //     })

    //     console.log('signalsInOrder: ', signalsInOrder)
    //     console.log('signal.output: ', signal.output)

    //     const sortedInputSignals = signalsInOrder.map(el => el.split('').sort().join(''))
    //     const sortedOutputSignals = signal.output.map(el => el.split('').sort().join(''))

    //     return sortedOutputSignals.map(el => sortedInputSignals.findIndex(signalRepresentation => el === signalRepresentation))
    //         .reverse().reduce(
    //             (total, value, index) => total + value * (10 ** index)
    //             , 0)
    //     // if (signal.length === 2) return 1
    //     // if (signal.length === 4) return 4
    //     // if (signal.length === 3) return 7
    //     // if (signal.length === 7) return 8
    //     // else return signal
    // }

    // // const partOne = input
    // //     .map(el => el.output.map(decodeSignal)
    // //         .filter(el => !isNaN(el))
    // //         .map(() => 1)
    // //         .reduce(sumNumbers, 0)
    // //     ).reduce(sumNumbers, 0)
    // // console.log('partOne: ', partOne)

    // const partTwo = input
    //     .map(el => decodeSignal(el))
    //     .reduce(sumNumbers, 0)

    // console.log('partTwo: ', partTwo)

    const [displayGrids, setDisplayGrids] = React.useState([])

    const [displayInput] = React.useState('acdefg fg abcef abcfg bdfg abcdg abcdeg afg abcdefg abcdfg')

    const signalToGrid = (encodedSignal, decodingTable) => {
        const grid = [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
        ]

        encodedSignal.split('').forEach(el => {
            decodingTable[el].forEach(([x, y]) => {
                grid[x][y] = true
            })
        })

        return grid
    }

    const signalPermutations = () => {
        const allLetters = 'abcdefg'.split('')
        const letterPermutations = permutations(allLetters)

        const decodings = [
            // top
            [[0, 1], [0, 2], [0, 3], [0, 4]],
            // middle
            [[5, 1], [5, 2], [5, 3], [5, 4]],
            // bottom
            [[10, 1], [10, 2], [10, 3], [10, 4]],
            // left top
            [[1, 0], [2, 0], [3, 0], [4, 0]],
            // left bottom
            [[6, 0], [7, 0], [8, 0], [9, 0]],
            // right top
            [[1, 5], [2, 5], [3, 5], [4, 5]],
            // right bottom
            [[6, 5], [7, 5], [8, 5], [9, 5]],
        ]

        return letterPermutations.map(letters => ({
            [letters[0]]: decodings[0],
            [letters[1]]: decodings[1],
            [letters[2]]: decodings[2],
            [letters[3]]: decodings[3],
            [letters[4]]: decodings[4],
            [letters[5]]: decodings[5],
            [letters[6]]: decodings[6],
        }))
    }

    const [decodingPermutations] = React.useState(signalPermutations())

    const nextFrame = React.useCallback((frameCount) => {
        const frameIndex = Math.max(frameCount % decodingPermutations.length, 0)
        console.log('frameIndex: ', frameIndex)
        const decoding = decodingPermutations[frameIndex]
        const grids = displayInput.split(' ').map(signal => {
            return signalToGrid(signal, decoding)
        })
        setDisplayGrids(grids)
    }, [decodingPermutations, displayInput])

    React.useEffect(() => {
        let frameIndex = -50
        const interval = setInterval(() => {
            nextFrame(frameIndex)
            frameIndex += 1
        }, 10)
        return () => clearInterval(interval)
    }, [nextFrame])

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            {/* <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a> */}
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '80vw', height: '50vh', columnGap: 50, rowGap: 50, flexWrap: 'wrap' }}>
                {displayGrids.map(displayGrid => (
                    <Grid
                        gridData={displayGrid}
                        cellSize={27}
                        cellContentCallback={el => ''}
                        cellStyleCallback={el => ({
                            backgroundColor: el ? deepSaffron : 'transparent',
                            border: '1px dashed rgba(255,255,255,0.3)',
                        })}
                    />
                ))}
            </div>

        </div>
    </div >
}

export default Day