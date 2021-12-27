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

// const D100Factory = () => {
//     let internalCounter = 0
//     let totalTimesRolled = 0
//     const roll = () => {
//         internalCounter = (internalCounter % 100) + 1
//         totalTimesRolled++
//         return internalCounter
//     }
//     const getTotalTimesRolled = () => totalTimesRolled
//     return [roll, getTotalTimesRolled]
// }

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    // const startingPositions = fileText.split('\n')
    //     .map(el => el.substring(28))
    //     .map(el => parseInt(el))

    // const [roll, getTotalTimesRolled] = D100Factory()

    // let p1Score = 0
    // let p2Score = 0

    // while (p1Score < 1000 && p2Score < 1000) {
    //     let p1Steps = roll() + roll() + roll()
    //     startingPositions[0] = (startingPositions[0] + p1Steps) % 10
    //     if (startingPositions[0] === 0) startingPositions[0] = 10
    //     p1Score += startingPositions[0]
    //     if (p1Score >= 1000) break

    //     let p2Steps = roll() + roll() + roll()
    //     startingPositions[1] = (startingPositions[1] + p2Steps) % 10
    //     if (startingPositions[1] === 0) startingPositions[1] = 10
    //     p2Score += startingPositions[1]
    // }

    // console.log('p1Score: ', p1Score)
    // console.log('p2Score: ', p2Score)
    // console.log('totalTimesRolled: ', getTotalTimesRolled())

    // if (p1Score >= 1000) console.log('partOne: ', p2Score * getTotalTimesRolled())
    // else if (p2Score >= 1000) console.log('partOne: ', p1Score * getTotalTimesRolled())

    const startingPositions = fileText.split('\n')
        .map(el => el.substring(28))
        .map(el => parseInt(el))

    // Calculate each possible total
    // Weight the score by amount of universes that share that total
    // const diceTotalToUniverseTable = {
    //     3: 1,
    //     4: 3,
    //     5: 6,
    //     6: 7,
    //     7: 6,
    //     8: 3,
    //     9: 1,
    // }

    // On average 5.5 points per turn, goal is 21
    // Assume max turns is around 4
    // const combinationsSuperArray = [
    //     ...Object.keys(diceTotalToUniverseTable),
    //     // ...Object.keys(diceTotalToUniverseTable),
    //     // ...Object.keys(diceTotalToUniverseTable),
    //     // ...Object.keys(diceTotalToUniverseTable),
    //     // ...Object.keys(diceTotalToUniverseTable),
    // ].map(el => parseInt(el))

    // const p1Paths = powerset(combinationsSuperArray)
    // const p2Paths = p1Paths.slice()
    // console.log('p1Paths.length: ', p1Paths)
    // console.log('p2Paths.length: ', p2Paths.length)

    // let p1Wins = 0
    // let p2Wins = 0

    // p1Paths.forEach(p1Path => {
    //     p2Paths.forEach(p2Path => {
    //         let p1Score = 0
    //         let p2Score = 0
    //         let pathIndex = 0
    //         let p1Position = startingPositions[0]
    //         let p2Position = startingPositions[1]
    //         while (p1Score < 21 && p2Score < 21 && pathIndex < 5) {
    //             const p1Steps = p1Path[pathIndex]
    //             p1Position = (p1Position + p1Steps) % 10
    //             if (p1Position === 0) p1Position = 10
    //             p1Score += p1Position
    //             if (p1Score >= 21) {
    //                 const universesWithThisOutcome = [...p1Path.slice(0, pathIndex + 1), ...p2Path.slice(0, pathIndex + 1)].map(el => diceTotalToUniverseTable[el]).reduce((total, el) => total * el, 1)
    //                 p1Wins += universesWithThisOutcome
    //                 break
    //             }

    //             const p2Steps = p2Path[pathIndex]
    //             p2Position = (p2Position + p2Steps) % 10
    //             if (p2Position === 0) p2Position = 10
    //             p2Score += p2Position
    //             if (p2Score >= 21) {
    //                 const universesWithThisOutcome = [...p1Path.slice(0, pathIndex + 1), ...p2Path.slice(0, pathIndex + 1)].map(el => diceTotalToUniverseTable[el]).reduce((total, el) => total * el, 1)
    //                 p2Wins += universesWithThisOutcome
    //                 break
    //             }
    //             pathIndex++
    //         }
    //     })
    // })

    // console.log('p1Wins: ', p1Wins)
    // console.log('p2Wins: ', p2Wins)

    // universe state = [p1 pos, p2 pos, p1 score, p2 score, turn]
    const startUniverse = [startingPositions[0] - 1, startingPositions[1] - 1, 0, 0, 0]
    const universeCache = new Map()
    const hashUniverseState = universeState => universeState.join('/')

    const nextStateIfyouRollX = (universeState, rollValue) => {
        const currentPlayer = Math.floor((universeState[4]) / 3)
        universeState[0 + currentPlayer] = (universeState[0 + currentPlayer] + rollValue) % 10
        if (universeState[4] % 6 === 2 || universeState[4] % 6 === 5) {
            universeState[2 + currentPlayer] += universeState[0 + currentPlayer] + 1
        }
        universeState[4] = (universeState[4] + 1) % 6
        return universeState
    }

    const playFromState = universeState => {
        const hashKey = hashUniverseState(universeState)
        if (universeCache.has(hashKey)) return universeCache.get(hashKey)
        if (universeState[2] >= 21) return [1, 0]
        if (universeState[3] >= 21) return [0, 1]

        const result = [
            playFromState(nextStateIfyouRollX(universeState.slice(), 1)),
            playFromState(nextStateIfyouRollX(universeState.slice(), 2)),
            playFromState(nextStateIfyouRollX(universeState.slice(), 3)),
        ].reduce((total, el) => [total[0] + el[0], total[1] + el[1]])
        universeCache.set(hashKey, result)
        return result
    }

    const partTwo = playFromState(startUniverse)
    console.log('partTwo: ', Math.max(...partTwo))

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day