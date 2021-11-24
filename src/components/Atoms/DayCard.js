import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { black, deepSaffron, white } from "../../utils/CustomTheme"
import { getDayInfo } from "../../utils/DayInfo"

const useStyles = makeStyles(() => ({
    calendarItem: {
        width: 400,
        height: 250,
        borderColor: deepSaffron,
        borderWidth: 1,
        borderStyle: 'solid',
        color: white,
        backgroundColor: black,
        position: 'relative',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        margin: 20,
    },
    backgroundIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0.5,
    }
}))

const DayCard = ({ dayNumber }) => {
    const classes = useStyles()
    const dayInfo = getDayInfo(dayNumber)
    return <Link to={`/day-${dayNumber}`}>
        <div className={classes.calendarItem}>
            <p className={classes.title}>
                #{dayNumber} {dayInfo.title}
            </p>
            <p className={classes.description}>
                {dayInfo.description}
            </p>
            <OpenInNewIcon color="primary" className={classes.backgroundIcon} fontSize='large' />
        </div >
    </Link>
}

export default DayCard