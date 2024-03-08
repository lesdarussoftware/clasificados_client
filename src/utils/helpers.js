export const handleOpen = (type) => {
    const dialog = document.querySelector(`.${type}`)
    dialog.showModal()
}

export const handleClose = (type, setAction, reset) => {
    const dialog = document.querySelector(`.${type}`)
    dialog?.close()
    if (setAction) setAction(null)
    if (reset) reset()
}

export function setLocalDate(date) {
    const original = new Date(date)
    original.setHours(original.getHours() - 3)
    return original
}