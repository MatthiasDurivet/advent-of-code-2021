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

    const lines = fileText.split('\n').length

    const bitRepr = []
    fileText.split('\n')[0].split('').forEach((bit, index) => bitRepr[index] = 0)
    fileText.split('\n')
        .forEach(bitstr => {
            bitstr.split('').forEach((bit, index) => {
                if (bit === '1') {
                    bitRepr[index] += 1
                }
            })
        })

    console.log('bitRepr: ', bitRepr)

    const gamma = parseInt(
        bitRepr
            .map(el => {
                if (el > lines / 2) return 1
                else return 0
            })
            .join('')
        , 2)

    const epsilon = parseInt(
        bitRepr
            .map(el => {
                if (el > lines / 2) return 0
                else return 1
            })
            .join('')
        , 2)

    console.log('gamma*epsilon: ', gamma * epsilon)
    console.log('gamma*epsilon: ', gamma)
    console.log('gamma*epsilon: ', epsilon)

    // let oxygen = fileText.split('\n')
    // let i = 0
    // while (oxygen.length > 1) {
    //     let sum = 0
    //     oxygen.forEach(bitstr => {
    //         if (bitstr[i] === '1') sum += 1
    //     })
    //     let keepBit
    //     if (sum >= oxygen.length / 2) keepBit = '1'
    //     else keepBit = '0'

    //     oxygen = oxygen.filter(bitstr => {
    //         return bitstr[i] === keepBit
    //     })
    //     i++
    // }

    // console.log('oxygen: ', oxygen[0])
    // console.log('oxygen: ', parseInt(oxygen[0], 2))



    // let carbon = fileText.split('\n')
    // i = 0
    // while (carbon.length > 1) {
    //     let sum = 0
    //     carbon.forEach(bitstr => {
    //         if (bitstr[i] === '1') sum += 1
    //     })
    //     let keepBit
    //     if (sum < carbon.length / 2) keepBit = '1'
    //     else keepBit = '0'

    //     carbon = carbon.filter(bitstr => {
    //         return bitstr[i] === keepBit
    //     })
    //     i++
    // }

    // console.log('carbon: ', carbon[0])
    // console.log('carbon: ', parseInt(carbon[0], 2))

    // console.log('res: ', parseInt(carbon[0], 2) * parseInt(oxygen[0], 2))


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day