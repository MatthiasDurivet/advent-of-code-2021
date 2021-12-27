import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { multiplyNumbers, sumNumbers } from '../../../utils/helperFunctions'

const useStyles = makeStyles(() => ({
    dayContainer: {
        marginTop: 50,
        marginBottom: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: white,
    },
    externalLink: {
        color: deepSaffron
    },
}))

const getVersion = stringOfBits => {
    const paddedValue = '0'.repeat(16 - 3) + stringOfBits.substring(0, 3)
    return parseInt(paddedValue, 2)
}

const getTypeId = stringOfBits => {
    const paddedValue = '0'.repeat(16 - 3) + stringOfBits.substring(3, 6)
    return parseInt(paddedValue, 2)
}

const splitIntoChunks = (stringOfBits, chunkSize) => {
    return stringOfBits.split('').reduce((total, el, index) => {
        if (index % chunkSize === 0) {
            return [...total, [el]]
        } else {
            return [...total.slice(0, -1), [...total.slice(-1)[0], el]]
        }
    }, [])
}

const decodeLiteralValue = stringOfBits => {
    let readBits = 0
    const payload = stringOfBits.substring(6)
    readBits += 6
    const chunks = splitIntoChunks(payload, 5)
    let valueHasEnded = false
    const filterTrailingZeroes = chunks.filter(chunk => {
        if (valueHasEnded) return false
        if (chunk[0] === '1') {
            readBits += 5
            return true
        }
        if (chunk[0] === '0') {
            readBits += 5
            valueHasEnded = true
            return true
        }
        return false
    })
    const filterFlagBit = filterTrailingZeroes.map(el => el.slice(1))
    return [parseInt(filterFlagBit.flat().join(''), 2), readBits]
}

function decodeOperator(stringOfBits) {
    let totalReadBits = 0
    const subPackets = []
    const lengthId = stringOfBits[6]
    totalReadBits += 7
    if (lengthId === '0') {
        const payload = stringOfBits.substring(7, 7 + 15)
        totalReadBits += 15
        const totalLength = parseInt(payload, 2)
        // console.log('payload: ', payload)
        // console.log('totalLength: ', totalLength)
        while (totalReadBits < totalLength + 3 + 3 + 1 + 15) {
            const remainingPayload = stringOfBits.substring(totalReadBits)
            const subPacket = decodeBits(remainingPayload)
            subPackets.push(subPacket)
            // console.log('subPacket: ', subPacket)
            totalReadBits += subPacket.readBits
        }
    } else {
        const payload = stringOfBits.substring(7, 7 + 11)
        totalReadBits += 11
        const numberOfPackets = parseInt(payload, 2)
        // console.log('payload: ', payload)
        // console.log('numberOfPackets: ', numberOfPackets)
        while (subPackets.length < numberOfPackets) {
            const remainingPayload = stringOfBits.substring(totalReadBits)
            const subPacket = decodeBits(remainingPayload)
            // console.log('subPacket: ', subPacket)
            subPackets.push(subPacket)
            totalReadBits += subPacket.readBits
        }
    }
    return [subPackets, totalReadBits]
}

function decodeBits(stringOfBits) {
    console.log('stringOfBits: ', stringOfBits)
    let bitValue = stringOfBits
    const version = getVersion(bitValue)
    const type = getTypeId(bitValue)
    if (type === 4) {
        const [literalValue, readBits] = decodeLiteralValue(bitValue)
        return { version, type, literalValue, readBits }
    } else {
        const [subPackets, readBits] = decodeOperator(bitValue)
        return { version, type, subPackets, readBits }
    }
}

const recursiveSumVersions = packet => {
    return packet.version + (packet.subPackets || []).map(el => recursiveSumVersions(el)).reduce(sumNumbers, 0)
}

const hexMap = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
}

const performOperations = decodedPacket => {
    if (decodedPacket.type === 4) return decodedPacket.literalValue

    const subPackets = decodedPacket.subPackets.map(el => performOperations(el))

    if (decodedPacket.type === 0) return subPackets.reduce(sumNumbers, 0)
    if (decodedPacket.type === 1) return subPackets.reduce(multiplyNumbers, 1)
    if (decodedPacket.type === 2) return Math.min(...subPackets)
    if (decodedPacket.type === 3) return Math.max(...subPackets)
    if (decodedPacket.type === 5) return subPackets[0] > subPackets[1] ? 1 : 0
    if (decodedPacket.type === 6) return subPackets[0] < subPackets[1] ? 1 : 0
    if (decodedPacket.type === 7) return subPackets[0] === subPackets[1] ? 1 : 0
}

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />
    const numberValue = fileText.split('').map(el => hexMap[el]).join('')
    let bitValue = numberValue.toString(2)
    bitValue = bitValue.padStart(fileText.length * 4, '0')
    const decoded = decodeBits(bitValue)
    console.log('decoded: ', decoded)
    const versionSum = recursiveSumVersions(decoded)
    console.log('versionSum: ', versionSum)
    const partTwo = performOperations(decoded)
    console.log('partTwo: ', partTwo)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day