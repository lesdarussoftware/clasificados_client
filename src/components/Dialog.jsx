export function Dialog({
    children,
    type,
    top = '25%',
    left = 'calc(50% - (30% / 2))',
    width = '30%'
}) {
    return (
        <dialog id="dialog" className={type} style={{ top, left, width }}>
            {children}
        </dialog>
    )
}