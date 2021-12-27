const encodeState = ({
    roomA = [],
    roomB = [],
    roomC = [],
    roomD = [],
    cornerOne = [],
    cornerTwo = [],
    hallwayOne = [],
    hallwayTwo = [],
    hallwayThree = []
}) => {
    return [
        roomA.join(''),
        roomB.join(''),
        roomC.join(''),
        roomD.join(''),
        cornerOne.join(''),
        cornerTwo.join(''),
        hallwayOne.join(''),
        hallwayTwo.join(''),
        hallwayThree.join(''),
    ].join('|')
}

const isBlocked = (roomName, hallwayName, state) => {
    if (hallwayName === 'cornerOne') {
        if (roomName === 'roomA') return false
        else if (roomName === 'roomB') return state.hallwayOne.length === 1
        else if (roomName === 'roomC') return state.hallwayOne.length === 1 || state.hallwayTwo.length === 1
        else if (roomName === 'roomD') return state.hallwayOne.length === 1 || state.hallwayTwo.length === 1 || state.hallwayThree.length === 1
    } else if (hallwayName === 'cornerTwo') {
        if (roomName === 'roomA') return state.hallwayThree.length === 1 || state.hallwayTwo.length === 1 || state.hallwayOne.length === 1
        else if (roomName === 'roomB') return state.hallwayThree.length === 1 || state.hallwayTwo.length === 1
        else if (roomName === 'roomC') return state.hallwayThree.length === 1
        else if (roomName === 'roomD') return false
    } else if (hallwayName === 'hallwayOne') {
        if (roomName === 'roomA') return false
        else if (roomName === 'roomB') return false
        else if (roomName === 'roomC') return state.hallwayTwo.length === 1
        else if (roomName === 'roomD') return state.hallwayTwo.length === 1 || state.hallwayThree.length === 1
    } else if (hallwayName === 'hallwayTwo') {
        if (roomName === 'roomA') return state.hallwayOne.length === 1
        else if (roomName === 'roomB') return false
        else if (roomName === 'roomC') return false
        else if (roomName === 'roomD') return state.hallwayThree.length === 1
    } else if (hallwayName === 'hallwayThree') {
        if (roomName === 'roomA') return state.hallwayTwo.length === 1 || state.hallwayOne.length === 1
        else if (roomName === 'roomB') return state.hallwayTwo.length === 1
        else if (roomName === 'roomC') return false
        else if (roomName === 'roomD') return false
    }
}

const canBeEntered = (roomName, state) => state[roomName].every(el => el === roomName[4])

const costLookupTable = {
    'A': 1,
    'B': 10,
    'C': 100,
    'D': 1000,
}
const getCost = (roomName, hallwayName, state, element) => {
    const previousCost = state.cost
    const costMultiplier = costLookupTable[element]
    let movementSteps = 0

    // Move to hallway outside of room
    movementSteps += 3 - state[roomName].length

    if (allCorners.includes(hallwayName)) {
        // Move to top of corner
        movementSteps += 1 - state[hallwayName].length
    }

    if (hallwayName === 'cornerOne') {
        if (roomName === 'roomA') movementSteps += 1
        else if (roomName === 'roomB') movementSteps += 3
        else if (roomName === 'roomC') movementSteps += 5
        else if (roomName === 'roomD') movementSteps += 7
    } else if (hallwayName === 'cornerTwo') {
        if (roomName === 'roomA') movementSteps += 7
        else if (roomName === 'roomB') movementSteps += 5
        else if (roomName === 'roomC') movementSteps += 3
        else if (roomName === 'roomD') movementSteps += 1
    } else if (hallwayName === 'hallwayOne') {
        if (roomName === 'roomA') movementSteps += 1
        else if (roomName === 'roomB') movementSteps += 1
        else if (roomName === 'roomC') movementSteps += 3
        else if (roomName === 'roomD') movementSteps += 5
    } else if (hallwayName === 'hallwayTwo') {
        if (roomName === 'roomA') movementSteps += 3
        else if (roomName === 'roomB') movementSteps += 1
        else if (roomName === 'roomC') movementSteps += 1
        else if (roomName === 'roomD') movementSteps += 3
    } else if (hallwayName === 'hallwayThree') {
        if (roomName === 'roomA') movementSteps += 5
        else if (roomName === 'roomB') movementSteps += 3
        else if (roomName === 'roomC') movementSteps += 1
        else if (roomName === 'roomD') movementSteps += 1
    }
    return previousCost + (movementSteps * costMultiplier)
}

const allCorners = ['cornerOne', 'cornerTwo']
const allBetweenDoors = ['hallwayOne', 'hallwayTwo', 'hallwayThree']
const allHallways = [...allCorners, ...allBetweenDoors]
const allRooms = ['roomA', 'roomB', 'roomC', 'roomD'].reverse()

const dfsRecursiveMemoized = (state, cache) => {
    // console.log(state)
    // console.log(cache)

    if (state.roomA && state.roomA.length === 4 && state.roomA.every(el => el === 'A') && state.cornerOne.length === 0 && state.cornerTwo.length === 0 && state.hallwayOne.length === 0 && state.hallwayTwo.length === 0 && state.hallwayThree.length === 0) {
        return state
    }

    const encodedState = encodeState(state)
    if (cache.has(encodedState)) return cache.get(encodedState)

    let lowestCostState = { cost: Infinity }

    const unfinishedRooms = allRooms.filter(roomName => !canBeEntered(roomName, state))

    // From room to corner
    allCorners.forEach(cornerName => {
        if (state[cornerName].length < 2) {
            unfinishedRooms.forEach(roomName => {
                if (!isBlocked(roomName, cornerName, state)) {
                    const stateOfBranch = dfsRecursiveMemoized(
                        {
                            ...state,
                            [roomName]: state[roomName].slice(1),
                            [cornerName]: [state[roomName][0], ...state[cornerName]],
                            cost: getCost(roomName, cornerName, state, state[roomName][0]),
                            moveHistory: [...state.moveHistory, `from ${roomName} to ${cornerName}`],
                        }
                        , cache)
                    if (stateOfBranch.cost < lowestCostState.cost) lowestCostState = stateOfBranch
                    // console.log(`from ${roomName} to ${cornerName}`)
                }
            })
        }
    })

    // From room to hallway
    allBetweenDoors.forEach(betweenDoorsName => {
        if (state[betweenDoorsName].length === 0) {
            unfinishedRooms.forEach(roomName => {
                if (!isBlocked(roomName, betweenDoorsName, state)) {
                    const stateOfBranch = dfsRecursiveMemoized(
                        {
                            ...state,
                            [roomName]: state[roomName].slice(1),
                            [betweenDoorsName]: [state[roomName][0], ...state[betweenDoorsName]],
                            cost: getCost(roomName, betweenDoorsName, state, state[roomName][0]),
                            moveHistory: [...state.moveHistory, `from ${roomName} to ${betweenDoorsName}`],
                        }
                        , cache)
                    if (stateOfBranch.cost < lowestCostState.cost) lowestCostState = stateOfBranch
                    // console.log(`from ${roomName} to ${betweenDoorsName}`)
                }
            })
        }
    })

    const openRooms = allRooms.filter(roomName => canBeEntered(roomName, state))

    // from hallway to room
    openRooms.forEach(roomName => {
        allHallways.forEach(hallwayName => {
            if (state[hallwayName].length > 0 && state[hallwayName][0] === roomName[4]) {
                if (!isBlocked(roomName, hallwayName, state)) {
                    const stateOfBranch = dfsRecursiveMemoized(
                        {
                            ...state,
                            [roomName]: [state[hallwayName][0], ...state[roomName]],
                            [hallwayName]: state[hallwayName].slice(1),
                            cost: getCost(roomName, hallwayName, state, state[hallwayName][0]),
                            moveHistory: [...state.moveHistory, `from ${hallwayName} to ${roomName}`],
                        }
                        , cache)
                    if (stateOfBranch.cost < lowestCostState.cost) lowestCostState = stateOfBranch
                    // console.log(`from ${hallwayName} to ${roomName}`)
                }
            }
        })
    })

    cache.set(encodedState, lowestCostState)
    return lowestCostState
}

const printState = ({
    roomA = [],
    roomB = [],
    roomC = [],
    roomD = [],
    cornerOne = [],
    cornerTwo = [],
    hallwayOne = [],
    hallwayTwo = [],
    hallwayThree = [],
    cost = 0,
    moveHistory = [],
}) => {
    const x1 = cornerOne.reverse().join('') || '..'
    const x2 = cornerTwo.join('') || '..'
    const h1 = hallwayOne.length === 1 ? hallwayOne[0] : '.'
    const h2 = hallwayTwo.length === 1 ? hallwayTwo[0] : '.'
    const h3 = hallwayThree.length === 1 ? hallwayThree[0] : '.'
    const a1 = roomA.length >= 1 ? roomA[0] : '.'
    const a2 = roomA.length >= 2 ? roomA[1] : '.'
    const a3 = roomA.length >= 3 ? roomA[2] : '.'
    const a4 = roomA.length >= 4 ? roomA[3] : '.'
    const b1 = roomB.length >= 1 ? roomB[0] : '.'
    const b2 = roomB.length >= 2 ? roomB[1] : '.'
    const b3 = roomB.length >= 3 ? roomB[2] : '.'
    const b4 = roomB.length >= 4 ? roomB[3] : '.'
    const c1 = roomC.length >= 1 ? roomC[0] : '.'
    const c2 = roomC.length >= 2 ? roomC[1] : '.'
    const c3 = roomC.length >= 3 ? roomC[2] : '.'
    const c4 = roomC.length >= 4 ? roomC[3] : '.'
    const d1 = roomD.length >= 1 ? roomD[0] : '.'
    const d2 = roomD.length >= 2 ? roomD[1] : '.'
    const d3 = roomD.length >= 3 ? roomD[2] : '.'
    const d4 = roomD.length >= 4 ? roomD[3] : '.'
    let grid = `cost: ${cost}
#############
#${x1}.${h1}.${h2}.${h3}.${x2}#
###${a1}#${b1}#${c1}#${d1}###
  #${a2}#${b2}#${c2}#${d2}#
  #${a3}#${b3}#${c3}#${d3}#
  #${a4}#${b4}#${c4}#${d4}#
  #########`
    console.log(moveHistory.join('\n'))
    console.log(grid)
}

// const roomA = [
//     'B',
//     'C',
// ]
// const roomB = [
//     'C',
//     'D',
// ]
// const roomC = [
//     'A',
//     'D',
// ]
// const roomD = [
//     'B',
//     'A',
// ]

const roomA = [
    'B',
    'D',
    'D',
    'C',
]
const roomB = [
    'C',
    'C',
    'B',
    'D',
]
const roomC = [
    'A',
    'B',
    'A',
    'D',
]
const roomD = [
    'B',
    'A',
    'C',
    'A',
]

const initialState = {
    roomA: roomA,
    roomB: roomB,
    roomC: roomC,
    roomD: roomD,
    cornerOne: [],
    cornerTwo: [],
    hallwayOne: [],
    hallwayTwo: [],
    hallwayThree: [],
    cost: 0,
    moveHistory: [],
}
console.log('initialState: ', initialState)
printState(initialState)

const stateCache = new Map()
const partTwo = dfsRecursiveMemoized(initialState, stateCache)
console.log('partTwo: ', partTwo)
printState(partTwo)
