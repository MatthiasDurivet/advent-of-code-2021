import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { combinations } from '../../../utils/helperFunctions'

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

const simpleRepresentation = startingElement => {

    const recursiveCallback = (topLevelElement, depth = 0) => {
        if (Array.isArray(topLevelElement)) {
            return topLevelElement.map(lowerLevelElement => {
                return recursiveCallback(lowerLevelElement, depth + 1)
            })
        } else {
            return { value: topLevelElement, depth: depth }
        }
    }

    const result = recursiveCallback(startingElement, 0)
    return result.flat(Infinity)
}

const simplifySnailNumber = snailNumber => {
    let result = snailNumber
    let updated = false

    // Explode
    for (let i = 0; i < result.length; i++) {
        if (i + 1 < result.length && result[i].depth > 4 && result[i].depth === result[i + 1].depth) {
            const firstEl = result[i]
            const secondEl = result[i + 1]
            if (i - 1 >= 0) {
                result[i - 1].value += firstEl.value
            }
            if (i + 2 < result.length) {
                result[i + 2].value += secondEl.value
            }
            result.splice(i, 2,
                { value: 0, depth: firstEl.depth - 1 }
            )
            updated = true
            break
        }
    }
    if (updated) return result

    // Split
    for (let i = 0; i < result.length; i++) {
        if (result[i].value >= 10) {
            const firstEl = Math.floor(result[i].value / 2)
            const secondEl = Math.ceil(result[i].value / 2)
            result.splice(i, 1,
                { value: firstEl, depth: result[i].depth + 1 },
                { value: secondEl, depth: result[i].depth + 1 },
            )
            break
        }
    }
    return result
}

const getMagnitude = snailNumber => {
    let result = snailNumber

    while (result.length > 1) {

        for (let i = 0; i < result.length; i++) {
            if (i + 1 < result.length && result[i].depth === result[i + 1].depth) {
                const firstEl = result[i]
                const secondEl = result[i + 1]
                result.splice(i, 2,
                    { value: firstEl.value * 3 + secondEl.value * 2, depth: firstEl.depth - 1 }
                )
                break
            }
        }
    }

    return result[0].value
}

// const printSnailNumber = snailNumber => {
//     console.log('snailNumber: ', JSON.stringify(snailNumber.map(el => el.value)))
// }

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const listOfSnailfishNumbers = fileText.split('\n')
        .map(el => JSON.parse(el))
        .map(el => simpleRepresentation(el))

    const increaseDepth = el => ({
        ...el,
        depth: el.depth + 1,
    })

    const sum = listOfSnailfishNumbers.reduce((total, el) => {
        let addition = [...total.map(el => increaseDepth(el)), ...el.map(el => increaseDepth(el))]

        while (true) {
            const previousLength = addition.length
            addition = simplifySnailNumber(addition.slice())

            // console.log('intermediate step')
            // printSnailNumber(addition)
            // console.log('')
            if (addition.length === previousLength) break
        }

        // printSnailNumber(total)
        // printSnailNumber(el)
        // printSnailNumber(addition)
        // console.log('')

        return addition
    })

    const magnitude = getMagnitude(sum)
    console.log('partOne: ', magnitude)

    const combos = combinations(listOfSnailfishNumbers, 2)
        .map(el => [el, el.reverse()])
        .flat()
    let highestMagnitude = 0
    combos.forEach(([snailNumberOne, snailNumberTwo]) => {
        let addition = [
            ...snailNumberOne.map(el => increaseDepth(el)),
            ...snailNumberTwo.map(el => increaseDepth(el))
        ]

        while (true) {
            const previousLength = addition.length
            addition = simplifySnailNumber(addition.slice())

            // console.log('intermediate step')
            // printSnailNumber(addition)
            // console.log('')
            if (addition.length === previousLength) break

        }
        const additionMagnitude = getMagnitude(addition)
        highestMagnitude = Math.max(highestMagnitude, additionMagnitude)

    })

    console.log('partTwo: ', highestMagnitude)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day