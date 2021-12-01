import React from "react"

const useLocalInputFile = (dayNumber = 0) => {
    const linkToInputFile = `/input-files/day-${dayNumber}.txt`
    const [fileText, setFileText] = React.useState(null)
    React.useEffect(() => {
        fetch(linkToInputFile)
            .then(response => response.text())
            .then(setFileText)
    }, [dayNumber, linkToInputFile])
    return [fileText, linkToInputFile]
}

const LocalInputFile = () => {

}

export default LocalInputFile
export { useLocalInputFile }