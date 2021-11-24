import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => ({
    background: {
        backgroundImage: "url('https://global-uploads.webflow.com/5fda08a9752aff55de5552b8/5fdb59dd020c202125fe0001_bg-placeholder%20(1).jpg')",
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: -1,
        top: 0,
        left: 0,
    }
}))

const Background = () => {
    const classes = useStyles()
    return <div className={classes.background} />
}
export default Background