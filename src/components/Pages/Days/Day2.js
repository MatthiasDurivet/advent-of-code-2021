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

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)


    if (!fileText) return <CircularProgress color="primary" />

    let aim = 0
    const depth = fileText.split('\n')
        .map(line => line.split(' '))
        .map(arr => {
            const amount = parseInt(arr[1])
            const direction = arr[0]
            if (direction === 'up') {
                aim -= amount
                return 0
            }
            if (direction === 'down') {
                aim += amount
                return 0
            }

            return aim * amount
        })
        .reduce(sumNumbers, 0)

    const horizontal = fileText.split('\n')
        .map(line => line.split(' '))
        .map(arr => {
            const amount = parseInt(arr[1])
            const direction = arr[0]
            if (direction === 'forward') return amount
            return 0
        })
        .reduce(sumNumbers, 0)

    console.log('depth: ', depth)
    console.log('horizontal: ', horizontal)
    console.log('depth*horizontal: ', depth * horizontal)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day