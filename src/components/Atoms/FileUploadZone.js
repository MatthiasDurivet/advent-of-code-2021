import React from "react"
import { makeStyles } from "@mui/styles"
import { deepSaffron, white } from "../../utils/CustomTheme"
import UploadFileIcon from '@mui/icons-material/UploadFile'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const useStyles = makeStyles(() => ({
    fileUploadContainer: {
        borderColor: deepSaffron,
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 300,
        height: 150,
        cursor: 'pointer',
        color: white,
    },
    uploadIcon: {
        opacity: 0.7,
    },
    uploadedFileContainer: {
        borderColor: deepSaffron,
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 20,
        color: white,
        padding: '0 10px',
        cursor: 'pointer',
    },
    hiddenInput: {
        display: 'none',
    }
}))

const useFileUpload = () => {
    const [uploadedFile, setUploadedFile] = React.useState(null)
    const [fileText, setFileText] = React.useState(null)
    React.useEffect(() => {
        if (uploadedFile) {
            const reader = new FileReader()
            reader.onload = event => setFileText(event.target.result) // desired file content
            // reader.onerror = error => console.error(error)
            reader.readAsText(uploadedFile)
        }
    }, [uploadedFile])

    return [fileText, uploadedFile, setUploadedFile]
}

const FileUploadZone = ({ uploadedFile, setUploadedFile }) => {
    const classes = useStyles()
    const handleUpload = event => {
        setUploadedFile(event.target.files[0])
    }

    if (!uploadedFile) {
        return <React.Fragment>
            <input type="file" id="upload-button-input" onChange={handleUpload} className={classes.hiddenInput} />

            <label htmlFor="upload-button-input">
                <div className={classes.fileUploadContainer}>
                    <UploadFileIcon sx={{ fontSize: 50 }} className={classes.uploadIcon} color="primary" />
                    <p>Upload an input file</p>
                </div>
            </label>
        </React.Fragment>
    }
    return <React.Fragment>
        <input type="file" id="upload-button-input" onChange={handleUpload} className={classes.hiddenInput} />

        <label htmlFor="upload-button-input">
            <div className={classes.uploadedFileContainer}>
                <InsertDriveFileIcon fontSize="large" color="primary" />
                <p>{uploadedFile.name}</p>
            </div>
        </label>
    </React.Fragment>
}

export default FileUploadZone
export { useFileUpload }