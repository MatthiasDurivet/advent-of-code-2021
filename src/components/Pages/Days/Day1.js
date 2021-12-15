import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import {
    sumNumbers
} from '../../../utils/helperFunctions'

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

    let previous = 100000000000000000
    // const diff = fileText.split('\n')
    //     .map(value => parseInt(value))
    //     .map(value => {
    //         const result = value > previous
    //         previous = value
    //         return result
    //     })
    const values = fileText.split('\n')
        .map(value => parseInt(value))

    const windows = []

    for (let i = 0; i < values.length - 2; i++) {
        const newWindow = values[i] + values[i + 1] + values[i + 2]
        console.log('newWindow: ', newWindow)
        windows.push(newWindow)
    }

    const diff = windows.map(value => {
        const result = value > previous
        previous = value
        return result
    })

    console.log('diff.reduce(sum, 0): ', diff.reduce(sumNumbers, 0))

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day