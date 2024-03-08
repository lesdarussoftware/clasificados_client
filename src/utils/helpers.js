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