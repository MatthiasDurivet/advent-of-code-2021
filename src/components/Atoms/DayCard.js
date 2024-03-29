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
        width: 250,
        marginLeft: 75,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        margin: 20,
        textAlign: 'center',
    },
    backgroundIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0.5,
    },
    emojiPreview: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 30,
    }
}))

const DayCard = ({ dayNumber }) => {
    const classes = useStyles()
    const dayInfo = getDayInfo(dayNumber)
    return <Link to={`/day-${dayNumber}`}>
        <div className={classes.calendarItem}>
            <p className={classes.title}>
                Day {dayNumber}: {dayInfo.title}
            </p>
            <p className={classes.description}>
                {dayInfo.description}
            </p>
            <OpenInNewIcon color="primary" className={classes.backgroundIcon} fontSize='large' />
            <div className={classes.emojiPreview}>{dayInfo.emoji}</div>
        </div >
    </Link>
}

export default DayCard