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

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    // console.log('fileText: ', fileText)

    const inputPaths = fileText.split('\n')
        .map(el => el.split('-'))
        .map(el => [{ from: el[0], to: el[1] }, { from: el[1], to: el[0] }])
        .flat()

    const lookupTable = {}
    inputPaths
        .filter(el => el.from !== 'end' && el.to !== 'start')
        .forEach(el => {
            if (lookupTable.hasOwnProperty(el.from)) {
                lookupTable[el.from].push(el.to)
            } else {
                lookupTable[el.from] = [el.to]
            }
        })
    console.log('lookupTable: ', lookupTable)

    const recursiveGetAllPaths = (paths, currentCave, seenCaves = []) => {
        const options = paths[currentCave].filter(
            el => !seenCaves
                .filter(el => el.charCodeAt(0) >= 97)
                .includes(el)
        )
        const result = []
        options.forEach(el => {
            if (el === 'end') {
                result.push([...seenCaves, currentCave, 'end'])
            }
            else {
                result.push(...recursiveGetAllPaths(paths, el, [...seenCaves, currentCave]))
            }
        })
        return result
    }

    const partOne = recursiveGetAllPaths(lookupTable, 'start')
    console.log('partOne: ', partOne.length)

    const getPartTwoPaths = (paths, currentCave, dubbleSmallCave, seenCaves = []) => {
        const options = paths[currentCave].filter(el => {
            if (el === dubbleSmallCave) {
                const occurances = seenCaves.filter(el => el === dubbleSmallCave).length
                return occurances <= 1
            } else {
                const smallCaveNotVisitedYet = !seenCaves
                    .filter(el => el.charCodeAt(0) >= 97)
                    .includes(el)
                return smallCaveNotVisitedYet
            }
        })
        const result = []
        options.forEach(el => {
            if (el === 'end') {
                result.push([...seenCaves, currentCave, 'end'])
            }
            else {
                result.push(...getPartTwoPaths(paths, el, dubbleSmallCave, [...seenCaves, currentCave]))
            }
        })
        return result
    }
    const partTwo = []
    Object.keys(lookupTable)
        .filter(el => el.charCodeAt(0) >= 97)
        .filter(el => el !== 'end' && el !== 'start')
        .forEach(el => {
            const branches = getPartTwoPaths(lookupTable, 'start', el)
            partTwo.push(...branches)
        })
    console.log('partTwo: ', partTwo)
    console.log('partTwo: ', partTwo.length)

    const uniques = new Set(partTwo.map(el => el.join('')))
    console.log('uniques: ', uniques)
    console.log('uniques.size: ', uniques.size)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day