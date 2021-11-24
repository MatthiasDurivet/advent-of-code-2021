import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom"

import { black, deepSaffron, white } from "../../utils/CustomTheme"

const useStyles = makeStyles(() => ({
    headerContainer: {
        backgroundColor: black,
        color: white,
        height: 50,
        fontSize: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        borderBottomColor: deepSaffron,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
    },
    navContainer: {
        backgroundColor: black,
        color: white,
        fontSize: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 50,
        borderBottomColor: deepSaffron,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
    },
    navItem: {
        padding: '0 24px',
        height: 50,
        lineHeight: '50px',
    }
}))

const Header = () => {
    const classes = useStyles()
    return <header>
        <div className={classes.headerContainer}>
            <div className={classes.headerTitle}>Advent of code 2021</div>
        </div>
        <nav>
            <div className={classes.navContainer}>
                <div className={classes.navItem}>
                    <Link to={`/`}>
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    </header>
}
export default Header