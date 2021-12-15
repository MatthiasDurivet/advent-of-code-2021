const infoPerDay = {
    4: { title: "Bingo!", description: "You play bingo ... with a giant squid." },
    5: { title: "Perilous eruptions.", emoji: '🌋', description: "Avoid the lines of hydro thermal vents to keep the boat afloat." },
    7: { title: "Deep sea crabs?", emoji: '🦀', description: "Suddenly, a swarm of crabs (each in its own tiny submarine) zooms in to rescue you! There's one major catch, crab submarines can only move horizontally." },
    8: { title: "A relic from the past.", description: "Decode the digital clocks. Each clock consists of a combination of 7 lines." },
    11: { title: "Flashy octopi.", emoji: '🐙', description: "There are 100 octopuses arranged neatly in a 10 by 10 grid. Each octopus slowly gains energy over time and flashes brightly for a moment when its energy is full." },
    13: { title: "Protein Folding.", emoji: '🟧', description: "No protein here, but a lot of folding. Fold a grid of dots onto itself to decrypt the final message." },
}

const getDayInfo = dayNumber => infoPerDay[dayNumber]
const getAllDayNumbers = () => Object.keys(infoPerDay)

export { getAllDayNumbers, getDayInfo }