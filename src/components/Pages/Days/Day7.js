import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Grid } from "../../Atoms"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"
import React from "react"

// import { sortNumbersAscending, sortNumbersDescending, sumNumbers, range } from '../../../utils/helperFunctions'


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
    const [crabs, setCrabs] = React.useState([])

    const scale = 100

    React.useEffect(() => {
        if (fileText) {
            setCrabs(
                fileText
                    .split(',')
                    .map(el => parseInt(el))
                    .map(el => Math.floor(el / scale))
                    .slice(100, 120)
            )
        }
    }, [fileText])

    // const crabs = fileText.split(',').map(el => parseInt(el))
    // const average = crabs.reduce(sumNumbers, 0) / crabs.length
    // console.log('average: ', average)

    // const factorialCache = []
    // const factorial = number => {
    //     return factorialCache[number]
    // }
    // const createFactorialCache = maxNumber => {
    //     console.log('maxNumber: ', maxNumber)
    //     const all = range(maxNumber + 1)
    //     all.forEach(index => factorialCache[index] = all.slice(0, index + 1).reduce(sumNumbers, 0))
    // }
    // createFactorialCache(crabs.sort(sortNumbersDescending)[0])
    // console.log('factorialCache: ', factorialCache)

    // const calculateCrabCostToMoveTo = (crabs, moveToCenter) => {
    //     // return crabs.map(el => Math.abs(el - moveToCenter)).reduce(sumNumbers, 0)
    //     return crabs.map(el => Math.abs(el - moveToCenter)).map(el => factorial(el)).reduce(sumNumbers, 0)
    // }

    // const getCheapestCenter = crabs => {
    //     const lowestCrab = crabs.sort(sortNumbersAscending)[0]
    //     const highestCrab = crabs.sort(sortNumbersDescending)[0]
    //     const costs = []
    //     const centerLookupTable = {

    //     }
    //     for (let i = lowestCrab; i < highestCrab; i++) {
    //         const cost = calculateCrabCostToMoveTo(crabs, i)
    //         costs.push(cost)
    //         centerLookupTable[cost] = i
    //     }
    //     console.log('crabs: ', crabs)
    //     console.log('costs: ', costs)
    //     console.log('costs.sort(sortNumbersAscending): ', costs.sort(sortNumbersAscending))
    //     const cheapest = costs.sort(sortNumbersAscending)[0]
    //     console.log('centerLookupTable[cheapest]: ', centerLookupTable[cheapest])
    //     return cheapest
    // }

    // const naiveSolution = getCheapestCenter(crabs)
    // console.log('naiveSolution: ', naiveSolution)
    const idealCenter = Math.floor(458 / scale)
    const crabMax = Math.max(...crabs)
    const [displayCrabs, setDisplayCrabs] = React.useState([])


    const nextFrame = React.useCallback((frameCount) => {
        const frameIndex = frameCount % Math.abs(crabMax - idealCenter + 10)
        const newCrabs = crabs.map(el => {
            let position
            if (el > idealCenter) position = Math.max(el - frameIndex, idealCenter)
            else position = Math.min(el + frameIndex, idealCenter)

            const crabRow = ' '.repeat(crabMax + 1).split('')
            crabRow[position] = '🦀'
            return crabRow
        })
        setDisplayCrabs(newCrabs)
    }, [crabs, crabMax, idealCenter])

    React.useEffect(() => {
        let frameIndex = 0
        const interval = setInterval(() => {
            nextFrame(frameIndex)
            frameIndex += 1
        }, 100)
        return () => clearInterval(interval)
    }, [nextFrame])

    if (!fileText) return <CircularProgress color="primary" />
    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <Grid
                gridData={displayCrabs}
                cellSize={35}
                cellStyleCallback={() => ({ fontSize: 25 })}
            />
        </div>
    </div >
}

export default Day