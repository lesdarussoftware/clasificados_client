export function Pagination({ children, count, page, setPage }) {
    return (
        <div>
            <div className="paginationFooter">
                <button onClick={() => setPage(page - 1)} disabled={page <= 0}>{'<'}</button>
                <p>Página {Math.ceil(count / 10) === 0 ? page : page + 1} de {Math.ceil(count / 10)}</p>
                <button onClick={() => setPage(page + 1)} disabled={(page + 1) === Math.ceil(count / 10)}>{'>'}</button>
            </div>
            {children}
        </div>
    )
}