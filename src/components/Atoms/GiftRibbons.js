import { makeStyles } from "@mui/styles"
import { Box } from "@mui/system"

import { black, white } from "../../utils/CustomTheme"

const useStyles = makeStyles(() => ({
    rectangleFace: {
        backgroundColor: black,
        color: white,
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px solid white',
    },
}))

const GiftRibbons = ({ height = 1, width = 1, length = 1, scale = 10 }) => {
    const classes = useStyles()
    const ribbonWidth = 2 * scale
    const maxRibbonHeight = 7 * scale


    return <Box sx={{
        position: 'relative',
        top: - height * scale,
        left: 0,
        height: height * scale,
        width: width * scale,
        transformStyle: 'preserve-3d',
    }}>
        <Box sx={{
            transform: 'rotateX(-20deg) rotateY(-35deg)',
            height: height * scale,
            width: width * scale,
            position: 'relative',
            transformStyle: 'preserve-3d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: ribbonWidth,
                transform: `translateZ(${length * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: ribbonWidth,
                transform: `rotateY(90deg) translateZ(${width * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: ribbonWidth,
                transform: `rotateY(180deg) translateZ(${length * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: ribbonWidth,
                transform: `rotateY(-90deg) translateZ(${width * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: length * scale,
                width: ribbonWidth,
                transform: `rotateX(90deg) translateZ(${height * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: length * scale,
                width: ribbonWidth,
                transform: `rotateX(-90deg) translateZ(${height * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: ribbonWidth,
                width: width * scale,
                transform: `rotateX(90deg) translateZ(${height * scale / 2}px)`,
            }} />

            <div className={classes.rectangleFace} style={{
                height: ribbonWidth,
                width: width * scale,
                transform: `rotateX(-90deg) translateZ(${height * scale / 2}px)`,
            }} />


            {/* Ribbon on top */}
            <div className={classes.rectangleFace} style={{
                borderRadius: 10,
                height: Math.min(maxRibbonHeight, height * scale * 2),
                width: ribbonWidth,
                transform: `translateY(-${height * scale / 2}px) rotateY(45deg) rotateZ(45deg)`,
            }} />
            <div className={classes.rectangleFace} style={{
                borderRadius: 10,
                height: Math.min(maxRibbonHeight, height * scale * 2),
                width: ribbonWidth,
                transform: `translateY(-${height * scale / 2}px) rotateY(135deg) rotateZ(45deg)`,
            }} />
            <div className={classes.rectangleFace} style={{
                borderRadius: 10,
                height: Math.min(maxRibbonHeight, height * scale * 2),
                width: ribbonWidth,
                transform: `translateY(-${height * scale / 2}px) rotateY(225deg) rotateZ(45deg)`,
            }} />
            <div className={classes.rectangleFace} style={{
                borderRadius: 10,
                height: Math.min(maxRibbonHeight, height * scale * 2),
                width: ribbonWidth,
                transform: `translateY(-${height * scale / 2}px) rotateY(315deg) rotateZ(45deg)`,
            }} />
        </Box>
    </Box>
}

export default GiftRibbons