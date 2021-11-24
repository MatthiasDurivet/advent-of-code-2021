import { makeStyles } from "@mui/styles"

import { useFileUpload } from "../../Atoms/FileUploadZone"
import { FileUploadZone } from "../../Atoms"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"


const useStyles = makeStyles(() => ({
    dayContainer: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: white,
    },
    externalLink: {
        color: deepSaffron
    }
}))

const Day = () => {
    const classes = useStyles()
    const [fileText, uploadedFile, setUploadedFile] = useFileUpload()

    const split = (fileText || '').split('\n')
    const massValues = split.map(value => parseInt(value))
    const fuelRequirements = massValues
        .map(value => value / 3)
        .map(value => Math.floor(value))
        .map(value => value - 2)
    const sum = fuelRequirements.reduce((a, b) => a + b, 0)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <FileUploadZone uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
            <a href='https://adventofcode.com/2019/day/1' className={classes.externalLink}>https://adventofcode.com/2019/day/1</a>
            <p>{fileText}</p>
            <p>{split}</p>
            <p>{massValues}</p>
            <p>{fuelRequirements}</p>
            <p>{sum}</p>
        </div>
    </div >
}

export default Day