import { createTheme } from '@mui/material/styles'


const white = '#ffffff'
const black = '#000000'
const deepSaffron = '#ff913a'
const unitedNationsBlue = '#3b88ff'

const palette = {
    primary: {
        main: deepSaffron,
        contrastText: white,
    },
    secondary: {
        main: unitedNationsBlue,
        contrastText: white,
    }
}

const CustomTheme = createTheme({
    palette: palette,
})

export { white, black, deepSaffron, unitedNationsBlue, CustomTheme }