const Grid = ({ gridData, cellSize = 30, cellStyleCallback = () => ({}), cellContentCallback = el => el, gridStyleCallback = () => ({}) }) => {
    return (
        <div style={gridStyleCallback(gridData)}>
            {gridData.map((row, y) => (
                <div key={y} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: gridData[0].length * cellSize, height: cellSize }}>
                    {row.map((cell, x) => (
                        <div key={x} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: cellSize, height: cellSize, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.3)', ...cellStyleCallback(cell, gridData, x, y) }}>
                            {cellContentCallback(cell, x, y)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Grid