import { makeStyles } from "@mui/styles"
import { Box } from "@mui/system"
import { keyframes } from '@emotion/react'

import { black, white } from "../../utils/CustomTheme"

const spin = keyframes({
    from: { transform: 'rotateX(0deg) rotateY(0deg)' },
    to: { transform: 'rotateX(360deg) rotateY(720deg)' }
})

const useStyles = makeStyles(() => ({
    rectangleContainer: {
        perspective: 600,
        margin: 100,
    },
    spinning: {
        position: 'relative',
        transformStyle: 'preserve-3d',
    },
    rectangleFace: {
        backgroundColor: black,
        color: white,
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: '50% 50%',
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px solid white',
    },
}))

const RotatingRectangle = ({ height = 1, width = 1, length = 1 }) => {
    const classes = useStyles()
    return <div className={classes.rectangleContainer}>
        <Box className={classes.spinning} sx={{
            animation: `${spin} 8s infinite linear`,
            transformOrigin: '50% 50%',
            height: height * 100,
            width: width * 100,
        }}>
            <div className={classes.rectangleFace} style={{
                height: height * 100,
                width: width * 100,
                transform: `translateZ(${length * 50}px)`,
            }}>FRONT</div>

            <div className={classes.rectangleFace} style={{
                height: height * 100,
                width: width * 100,
                transform: `rotateY(90deg) translateZ(${length * 50}px)`,
            }}>RIGHT</div>

            <div className={classes.rectangleFace} style={{
                height: height * 100,
                width: width * 100,
                transform: `rotateY(180deg) translateZ(${length * 50}px)`,
            }}>BACK</div>

            <div className={classes.rectangleFace} style={{
                height: height * 100,
                width: width * 100,
                transform: `rotateY(-90deg) translateZ(${length * 50}px)`,
            }}>LEFT</div>

            <div className={classes.rectangleFace} style={{
                height: height * 100,
                width: width * 100,
                transform: `rotateX(90deg) translateZ(${length * 50}px)`,
            }}>TOP</div>

            <div className={classes.rectangleFace} style={{
                height: height * 100,
                width: width * 100,
                transform: `rotateX(-90deg) translateZ(${length * 50}px)`,
            }}>BOTTOM</div>
        </Box>
    </div>
}

export default RotatingRectangle