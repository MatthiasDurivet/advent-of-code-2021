const infoPerDay = {
    // 0: { title: "Unknown", description: "Coming soon" },
}

const getDayInfo = dayNumber => infoPerDay[dayNumber]
const getAllDayNumbers = () => Object.keys(infoPerDay)

export { getAllDayNumbers, getDayInfo }