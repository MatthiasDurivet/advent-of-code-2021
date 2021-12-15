import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { sortNumbersAscending } from '../../../utils/helperFunctions'

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

    if (!fileText) return <CircularProgress color="primary" />

    const [startTemplate, b] = fileText.split('\n\n')
    const pairInsertionRules = {}

    b.split('\n')
        .map(el => el.split(' -> '))
        .forEach(el => pairInsertionRules[el[0]] = el[0][0] + el[1] + el[0][1])

    console.log('startTemplate: ', startTemplate)
    console.log('pairInsertionRules: ', pairInsertionRules)

    const performPairInsertion = template => {
        const result = []
        for (let i = 0; i < template.length - 1; i++) {
            const pair = template.substring(i, i + 2)

            const transformation = pairInsertionRules[pair]
            if (i === 0) {
                result.push(transformation)

            } else {
                result.push(transformation.substring(1, 3))
            }
        }
        return result.join('')
    }
    let template = startTemplate
    for (let i = 0; i < 10; i++) {
        template = performPairInsertion(template)
    }

    const countCharacter = (searchChar, el) => {
        return (el.match(new RegExp(searchChar, "g")) || []).length
    }

    // console.log('template: ', template)
    console.log('template.length: ', template.length)
    const allpossibleCharacters = [...new Set(Object.values(pairInsertionRules).map(el => el[1]))]
    console.log('allpossibleCharacters: ', allpossibleCharacters)
    // const charCounts = allpossibleCharacters.map(el => {
    //     return countCharacter(el, template)
    // }).sort(sortNumbersAscending)

    // console.log('charCounts: ', charCounts)
    // const partOne = charCounts.slice(-1)[0] - charCounts[0]
    // console.log('partOne: ', partOne)

    // const estimateLength = l => l * 2 - 1
    // let l = 2
    // for (let i = 0; i < 40; i++) {
    //     l = estimateLength(l)
    // }
    // console.log('l: ', l)

    const allPairs = Object.keys(pairInsertionRules)
    console.log('allPairs: ', allPairs)
    const pairLookupTable = {}
    allPairs.forEach(pair => {
        let template = pair
        for (let i = 0; i < 20; i++) {
            template = performPairInsertion(template)
        }
        const charCounts = {}
        allpossibleCharacters.forEach(el => {
            charCounts[el] = countCharacter(el, template)
        })
        pairLookupTable[pair] = charCounts
    })

    console.log('pairLookupTable: ', pairLookupTable)

    const total = {}

    template = startTemplate
    console.log('template: ', template)
    for (let i = 0; i < 20; i++) {
        template = performPairInsertion(template)
    }

    console.log('template.length: ', template.length)
    for (let i = 0; i < template.length - 1; i++) {
        const pair = template.substring(i, i + 2)

        for (const [key, value] of Object.entries(pairLookupTable[pair])) {
            if (!total[key]) total[key] = 0
            total[key] += value
            if (pair[1] === key && i !== template.length - 2) total[key] -= 1
        }
    }

    console.log('total: ', total)
    const sortedTotals = Object.values(total).sort(sortNumbersAscending)
    const partTwo = sortedTotals.slice(-1)[0] - sortedTotals[0]
    console.log('partTwo: ', partTwo)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day