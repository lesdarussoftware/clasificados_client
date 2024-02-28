export function Table({ columns, rows }) {
    return (
        <div className="tableMask">
            <table className="adminTable">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.label}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        return columns.map(col => {
                            const acc = col.accessor
                            if (typeof acc === 'function') {
                                return row[acc]
                            } else {
                                return acc(row)
                            }
                        })
                    })}
                </tbody>
            </table>
        </div>
    )
}