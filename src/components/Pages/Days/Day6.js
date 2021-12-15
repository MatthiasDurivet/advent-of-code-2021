import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { range, sumNumbers } from '../../../utils/helperFunctions'

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

    let schoolOfFish = fileText.split(',').map(el => parseInt(el))

    console.log('schoolOfFish: ', schoolOfFish)


    const simulateOneDay = (schoolOfFish) => {
        let result = [...schoolOfFish]
        const newFish = []
        result = result.map(el => {
            if (el === 0) {
                newFish.push(8)
                return 6
            } else {
                return el - 1
            }
        })
        return [...result, ...newFish]
    }

    // 1,2,3,3,4
    // One old fish becomes 2 after 7 days
    // One new fish becomes 2 after 9 days
    // In this example, after 18 days, there are a total of 26 fish. After 80 days, there would be a total of 5934.

    // const calculateBaseNewFish = (amountOfFish, amountOfDays) => {
    //     console.log('Math.floor(amountOfDays / 7): ', Math.floor(amountOfDays / 7))
    //     console.log('Math.floor(amountOfDays % 7): ', amountOfDays % 7)

    //     return amountOfFish * (2 ** Math.floor(amountOfDays / 7))
    // }

    // const calculateRemainingFish = (school, amountOfDays) => {
    //     return school.filter(el => el < amountOfDays % 7).length * (2 ** Math.floor(amountOfDays / 7))
    // }

    // const calculateFishLossToFirstCycle = (amountOfFish, amountOfDays) => {
    //     let newAmount = amountOfFish
    //     for (let i = 0; i < Math.floor(amountOfDays / 7); i++){

    //     }
    // }

    // console.log('5,18):', calculateBAseNewFish(5, 18), 'should be 26')
    // console.log('5,80):', calculateBAseNewFish(5, 80), 'should be 5934')
    // console.log('school,18):', calculateRemainingFish([1, 2, 3, 3, 4], 18), 'should be ')
    // console.log('school,80):', calculateRemainingFish([1, 2, 3, 3, 4], 80), 'should be ')


    let test = schoolOfFish
    // for (let i = 0; i < 18; i++) {
    //     test = simulateOneDay(test)
    // }

    console.log('test: ', test.length)
    for (let i = 0; i < 80 - 18; i++) {
        test = simulateOneDay(test)
    }

    // console.log('test: ', test.length)

    const calculateFish = (fish, amountOfDays) => {
        let mutableFish = [...fish]
        for (let i = 0; i < amountOfDays; i++) {
            const f0 = mutableFish[0]
            mutableFish = [...mutableFish.slice(1), f0]
            mutableFish[6] += f0
        }
        return mutableFish.reduce(sumNumbers, 0)
    }

    const groupedFish = range(9).map(el => schoolOfFish.filter(f => f === el).length)
    console.log('calculateFish(groupedFish, 18): ', calculateFish(groupedFish, 18))
    console.log('calculateFish(groupedFish, 80): ', calculateFish(groupedFish, 80))
    console.log('calculateFish(groupedFish, 80): ', calculateFish(groupedFish, 256))


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day