export function Dialog({ children, type }) {
    return (
        <dialog id="dialog" className={type}>
            {children}
        </dialog>
    )
}