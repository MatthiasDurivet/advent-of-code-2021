import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { sortNumbersAscending, sumNumbers } from '../../../utils/helperFunctions'


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
    const input = fileText.split('\n')

    const findFirstIllegalCharacter = inputLine => {
        const brackets = {
            '(': { closingBracket: ')', score: 3 },
            '[': { closingBracket: ']', score: 57 },
            '{': { closingBracket: '}', score: 1197 },
            '<': { closingBracket: '>', score: 25137 },
        }
        const closingBrackets = {
            ')': { closingBracket: ')', score: 3 },
            ']': { closingBracket: ']', score: 57 },
            '}': { closingBracket: '}', score: 1197 },
            '>': { closingBracket: '>', score: 25137 },
        }
        const seenBrackets = []
        let result
        inputLine.split('').forEach(el => {
            if (Object.keys(brackets).includes(el)) {
                seenBrackets.push(brackets[el])
            } else {
                const lastBracket = seenBrackets.pop()
                if (el !== lastBracket.closingBracket) {
                    console.log('FOUND BAD BRACKET ', el, 'expected', lastBracket)
                    if (!result) {
                        result = closingBrackets[el]
                    }
                }
            }
            // console.log('el: ', el)
            // console.log('seenBrackets: ', seenBrackets)
        })
        return result
    }
    const errors = input.map(el => findFirstIllegalCharacter(el))
    console.log('errors: ', errors)

    const partOne = errors.filter(el => el !== undefined).map(el => el.score).reduce(sumNumbers, 0)
    console.log('partOne: ', partOne)


    const autoCompleteBrackets = inputLine => {
        const brackets = {
            '(': { closingBracket: ')', score: 1 },
            '[': { closingBracket: ']', score: 2 },
            '{': { closingBracket: '}', score: 3 },
            '<': { closingBracket: '>', score: 4 },
        }
        const seenBrackets = []
        inputLine.split('').forEach(el => {
            if (Object.keys(brackets).includes(el)) {
                seenBrackets.push(brackets[el])
            } else {
                seenBrackets.pop()
            }
        })
        return seenBrackets
    }

    const incomplete = input.filter(el => !findFirstIllegalCharacter(el)).map(el => autoCompleteBrackets(el))
    console.log('incomplete: ', incomplete)
    console.log('incomplete: ', incomplete.length)
    console.log('Math.floor(incomplete.length / 2): ', Math.floor(incomplete.length / 2))

    const partTwo = incomplete.map(el => el.reverse().map(el => el.score).reduce((total, value) => total * 5 + value, 0)).sort(sortNumbersAscending)[Math.floor(incomplete.length / 2)]
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