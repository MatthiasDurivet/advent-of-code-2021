import React from "react"
import { TextField } from '@mui/material'


const useFileTextEditor = (dayNumber = 0) => {
    const linkToInputFile = `/input-files/day-${dayNumber}.txt`
    const [fileText, setFileText] = React.useState(null)
    React.useEffect(() => {
        fetch(linkToInputFile)
            .then(response => response.text())
            .then(setFileText)
    }, [dayNumber, linkToInputFile])
    return [fileText, setFileText]
}

const FileTextEditor = ({ fileText, setFileText }) => {

    const onChange = event => setFileText(event.target.value)

    return <div style={{ width: 400, minWidth: 400, backgroundColor: 'rgb(0,0,0)' }}>
        <TextField
            color='primary'
            id="outlined-multiline-flexible"
            label="Input file editor"
            focused
            multiline
            rows={25}
            fullWidth
            value={fileText}
            onChange={onChange}
        />
    </div>
}

export default FileTextEditor
export { useFileTextEditor }