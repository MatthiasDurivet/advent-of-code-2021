const initialRooms = [
    [
        'B',
        'D',
        'D',
        'C',
    ],
    [
        'C',
        'C',
        'B',
        'D',
    ],
    [
        'A',
        'B',
        'A',
        'D',
    ],
    [
        'B',
        'A',
        'C',
        'A',
    ],
]
const room_map = [2, 4, 6, 8]
const hall_spots = [0, 1, 3, 5, 7, 9, 10]
const destinations = { A: 0, B: 1, C: 2, D: 3 }
const costs = { A: 1, B: 10, C: 100, D: 1000 }
const room_size = 4
const hallway_start = Array(11).fill(null)
console.log('hallway_start: ', hallway_start)

const cache = new Map()

const encodeState = (hallway, rooms) => rooms.join('|') + '|' + hallway.join('|')
const endState = encodeState(
    Array(11).fill(null),
    [
        ['A', 'A', 'A', 'A'],
        ['B', 'B', 'B', 'B'],
        ['C', 'C', 'C', 'C'],
        ['D', 'D', 'D', 'D'],
    ]
)

console.log('endState: ', endState)

const f = lines => {
    const helper = (hallway, rooms) => {
        const encoded = encodeState(hallway, rooms)
        // console.log('encoded: ', encoded)
        if (encoded === endState) {
            console.log('FINISHED')
            console.log('hallway: ', hallway)
            console.log('rooms: ', rooms)
            return 0
        }

        if (cache.has(encoded)) return cache.get(encoded)

        if (hallway.every(el => el === null)) {
            console.log('bad hallway')
            console.log('hallway: ', hallway)
        }

        if (rooms.every(room => {
            return room.every(el => el === null)
        })) {
            console.log('bad rooms')
            console.log('rooms: ', rooms)
        }

        let best_cost = Infinity


        hallway.forEach((square, i) => {
            if (square === null) return
            const dest = destinations[square]
            let can_move = true
            for (const roommate of rooms[dest]) {
                if (roommate !== null && roommate !== square) {
                    can_move = false
                    break
                }
            }
            if (!can_move) return

            if (room_map[dest] > i) {
                for (let j = i + 1; j <= room_map[dest]; j += 1) {
                    if (hallway[j] !== null) {
                        can_move = false
                        break
                    }
                }
            } else {
                for (let j = i - 1; j >= room_map[dest]; j -= 1) {
                    if (hallway[j] !== null) {
                        can_move = false
                        break
                    }
                }

            }
            if (!can_move) return

            const none_count = rooms[dest].filter(el => el === null).length
            const new_room = [
                ...Array(none_count - 1).fill(null),
                ...Array(room_size - none_count + 1).fill(square)
            ]
            const steps = none_count + Math.abs(i - room_map[dest])
            const cost = steps * costs[square]
            const nextHallway = [
                ...hallway.slice(0, i),
                null,
                ...hallway.slice(i + 1),
            ]
            if (nextHallway.length !== 11) {
                console.log('hallway: ', hallway)
                console.log('i: ', i)
                console.log('nextHallway: ', nextHallway)
                console.log('badHallway in #1')
            }
            helper_result = helper(
                nextHallway,
                [
                    ...rooms.slice(0, dest),
                    new_room,
                    ...rooms.slice(dest + 1)
                ]
            )
            const new_cost = cost + helper_result
            // console.log('new_cost: ', new_cost)
            if (new_cost < best_cost) {
                best_cost = new_cost
            }
        })

        // console.log('best_cost: ', best_cost)
        // console.log('rooms.length: ', rooms.length)
        // console.log('rooms: ', rooms)
        // console.log('hallway: ', hallway.length)

        rooms.forEach((room, i) => {
            let wants_to_move = false
            for (const elem of room) {
                if (elem !== null && destinations[elem] !== i) {
                    wants_to_move = true
                }
                if (!wants_to_move) continue
                const none_count = room.filter(el => el === null).length
                const steps = none_count + 1
                const square = room[none_count]
                for (const hall_destination of hall_spots) {
                    const destination_steps = steps + Math.abs(hall_destination - room_map[i])
                    const destination_cost = destination_steps * costs[square]
                    let blocked = false
                    const a = Math.min(hall_destination, room_map[i])
                    const b = Math.max(hall_destination, room_map[i])
                    for (let j = a; j < b + 1; j++) {
                        if (hallway[j] !== null) {
                            blocked = true
                            break
                        }
                    }
                    if (blocked) continue
                    const new_room = [
                        ...Array(none_count + 1).fill(null),
                        ...room.slice(none_count + 1),
                    ]

                    const nextHallway = [
                        ...hallway.slice(0, hall_destination),
                        square,
                        ...hallway.slice(hall_destination + 1)
                    ]
                    if (nextHallway.length !== 11) {
                        console.log('hallway: ', hallway)
                        console.log('hall_destination: ', hall_destination)
                        console.log('nextHallway: ', nextHallway)
                        console.log('badHallway in #2')
                    }
                    const helper_result = helper(
                        nextHallway,
                        [
                            ...rooms.slice(0, i),
                            new_room,
                            ...rooms.slice(i + 1)
                        ]
                    )
                    const new_cost = destination_cost + helper_result
                    // console.log('new_cost: ', new_cost)
                    if (new_cost < best_cost) best_cost = new_cost
                }
            }
        })

        cache.set(encoded, best_cost)
        return best_cost
    }
    return helper(hallway_start, lines)
}

const result = f(initialRooms)
console.log('result: ', result)