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

const printGrid = grid => {
    console.log(grid.map(el => el.join('')).join('\n'))
}

const padGridWithChar = (originalGrid, paddingChar) => {
    const paddedGrid = originalGrid.map(el => el.slice()).slice().map(el => [paddingChar, ...el, paddingChar])
    paddedGrid.unshift(paddingChar.repeat(paddedGrid[0].length).split(''))
    paddedGrid.push(paddingChar.repeat(paddedGrid[0].length).split(''))
    return paddedGrid
}

const getNeighborOrigins = (centerX, centerY, xMax, yMax) => {
    const result = []
    // In order top-left -> bottom right
    const diffs = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1],
    ]
    diffs.forEach(el => {
        const x = centerX + el[0]
        const y = centerY + el[1]
        if ((x >= 0 && x < xMax) && (y >= 0 && y < yMax)) {
            result.push([x, y])
        }
    })
    return result
}

const slidingWindowBinary = grid => {
    return grid.slice(1, -1).map((el, y) => {
        return el.slice(1, -1).map((el, x) => {
            const neighbors = getNeighborOrigins(x + 1, y + 1, grid[0].length, grid.length)
            const gridString = neighbors.map(([x, y]) => grid[y][x]).join('')
            const binaryString = gridString.replaceAll('.', '0').replaceAll('#', '1')

            return parseInt(binaryString, 2)
        })
    })
}

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const input = fileText.split('\n\n')

    const lookupTable = input[0].split('')
    // console.log('lookupTable: ', lookupTable)

    const startingImage = input[1].split('\n').map(el => el.split(''))
    // printGrid(paddedImage)

    let paddedImage = startingImage
    for (let i = 0; i < 8; i++) {
        paddedImage = padGridWithChar(paddedImage, '.')
    }
    // for (let i = 0; i < 2; i++) {
    //     for (let i = 0; i < 2; i++) {
    //         paddedImage = padGridWithChar(paddedImage, '.')
    //     }
    //     const binaryValues = slidingWindowBinary(paddedImage)
    //     paddedImage = binaryValues.map(el => el.map(el => lookupTable[el]))
    //     printGrid(paddedImage)
    // }

    // const litPixels = paddedImage.map(el => el.filter(el => el === '#').length).reduce(sumNumbers, 0)
    // console.log('partOne: ', litPixels)

    // Blinking void
    const paddingChars = ['.', '#'] // Use with modulo 2 of the current step
    paddedImage = startingImage
    for (let i = 0; i < 3; i++) {
        paddedImage = padGridWithChar(paddedImage, paddingChars[0 % 2])
    }
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 2; j++) {
            paddedImage = padGridWithChar(paddedImage, paddingChars[i % 2])
        }
        printGrid(paddedImage)
        const binaryValues = slidingWindowBinary(paddedImage)
        paddedImage = binaryValues.map(el => el.map(el => lookupTable[el]))
        printGrid(paddedImage)
    }

    const litPixels = paddedImage.map(el => el.filter(el => el === '#').length).reduce(sumNumbers, 0)
    console.log('partTwo: ', litPixels)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day