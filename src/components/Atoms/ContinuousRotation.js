import { Box } from "@mui/system"
import { keyframes } from '@emotion/react'

const spin = keyframes({
    from: { transform: 'rotateX(0deg) rotateY(0deg)' },
    to: { transform: 'rotateX(0deg) rotateY(720deg)' }
})

const ContinuousRotation = ({ children, perspective = 1000, margin = 0, variant = 'hover' }) => {
    const spinAnimation = `${spin} 8s infinite linear`
    return <Box sx={{
        perspective: perspective,
        margin: margin,
    }}>
        <Box sx={{
            '&:hover': variant === 'hover' && {
                animation: spinAnimation,
            },
            animation: variant === 'always' && spinAnimation,
            transformStyle: 'preserve-3d',
            position: 'relative',
        }}>
            {children}
        </Box>
    </Box>
}

export default ContinuousRotation