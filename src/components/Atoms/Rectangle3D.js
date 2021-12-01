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

const RotatingRectangle = ({ height = 1, width = 1, length = 1, textPerFace = ['', '', '', '', '', ''], scale = 10 }) => {
    const classes = useStyles()

    return <Box sx={{
        position: 'relative',
        top: 0,
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
                width: width * scale,
                transform: `translateZ(${length * scale / 2}px)`,
            }}>{textPerFace[0]}</div>

            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: length * scale,
                transform: `rotateY(90deg) translateZ(${width * scale / 2}px)`,
            }}>{textPerFace[1]}</div>

            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: width * scale,
                transform: `rotateY(180deg) translateZ(${length * scale / 2}px)`,
            }}>{textPerFace[2]}</div>

            <div className={classes.rectangleFace} style={{
                height: height * scale,
                width: length * scale,
                transform: `rotateY(-90deg) translateZ(${width * scale / 2}px)`,
            }}>{textPerFace[3]}</div>

            <div className={classes.rectangleFace} style={{
                height: length * scale,
                width: width * scale,
                transform: `rotateX(90deg) translateZ(${height * scale / 2}px)`,
            }}>{textPerFace[4]}</div>

            <div className={classes.rectangleFace} style={{
                height: length * scale,
                width: width * scale,
                transform: `rotateX(-90deg) translateZ(${height * scale / 2}px)`,
            }}>{textPerFace[5]}</div>
        </Box>
    </Box>
}

export default RotatingRectangle