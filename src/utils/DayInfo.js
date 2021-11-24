const infoPerDay = {
    0: { title: "Abstract Day component", description: "Abstract component to start from." },
    1: { title: "Unknown", description: "Coming soon" },
    2: { title: "Unknown", description: "Coming soon" },
    3: { title: "Unknown", description: "Coming soon" },
    4: { title: "Unknown", description: "Coming soon" },
    5: { title: "Unknown", description: "Coming soon" },
    6: { title: "Unknown", description: "Coming soon" },
    7: { title: "Unknown", description: "Coming soon" },
    8: { title: "Unknown", description: "Coming soon" },
    9: { title: "Unknown", description: "Coming soon" },
    10: { title: "Unknown", description: "Coming soon" },
    11: { title: "Unknown", description: "Coming soon" },
    12: { title: "Unknown", description: "Coming soon" },
    13: { title: "Unknown", description: "Coming soon" },
    14: { title: "Unknown", description: "Coming soon" },
    15: { title: "Unknown", description: "Coming soon" },
    16: { title: "Unknown", description: "Coming soon" },
    17: { title: "Unknown", description: "Coming soon" },
    18: { title: "Unknown", description: "Coming soon" },
    19: { title: "Unknown", description: "Coming soon" },
    20: { title: "Unknown", description: "Coming soon" },
    21: { title: "Unknown", description: "Coming soon" },
    22: { title: "Unknown", description: "Coming soon" },
    23: { title: "Unknown", description: "Coming soon" },
    24: { title: "Unknown", description: "Coming soon" },
    25: { title: "Unknown", description: "Coming soon" },
    26: { title: "Unknown", description: "Coming soon" },
    27: { title: "Unknown", description: "Coming soon" },
    28: { title: "Unknown", description: "Coming soon" },
    29: { title: "Unknown", description: "Coming soon" },
    30: { title: "Unknown", description: "Coming soon" },
    31: { title: "Unknown", description: "Coming soon" },
}

const getDayInfo = dayNumber => infoPerDay[dayNumber]
const getAllDayNumbers = () => Object.keys(infoPerDay)

export { getAllDayNumbers, getDayInfo }