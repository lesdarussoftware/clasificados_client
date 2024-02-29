export function Table({ columns, rows, width }) {
    return (
        <div className="tableMask">
            <table className="adminTable" style={{ width }}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.label}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        const accessors = columns.map(col => col.accessor)
                        return (
                            <tr key={idx}>
                                {accessors.map((acc, idx) => {
                                    return (
                                        <td key={idx}>
                                            {typeof acc === 'function' ? acc(row) : row[acc] ?? '-'}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}