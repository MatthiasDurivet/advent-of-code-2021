import React from "react"
import { makeStyles } from "@mui/styles"

import { DayCard } from "../Atoms"
import { getAllDayNumbers } from "../../utils/DayInfo"

const useStyles = makeStyles(() => ({
    calendarContainer: {
        marginLeft: '10%',
        width: '80%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: 50,
        columnGap: 100,
        rowGap: 100,
        scrollBehavior: 'smooth',
        '& :nth-child(4)': {
            marginLeft: 200,
        },
        '& :nth-child(5)': {
            marginRight: 200,
        },
        '& :nth-child(9)': {
            marginLeft: 200,
        },
        '& :nth-child(10)': {
            marginRight: 200,
        },
        '& :nth-child(14)': {
            marginLeft: 200,
        },
        '& :nth-child(15)': {
            marginRight: 200,
        },
        '& :nth-child(19)': {
            marginLeft: 200,
        },
        '& :nth-child(20)': {
            marginRight: 200,
        },
        '& :nth-child(24)': {
            marginLeft: 200,
        },
        '& :nth-child(25)': {
            marginRight: 200,
        },
    },
}))

const Calendar = () => {
    const classes = useStyles()
    return <div className={classes.calendarContainer}>
        {getAllDayNumbers().map(dayNumber => <DayCard key={dayNumber} dayNumber={dayNumber} />)}
    </div>
}

export default Calendar