import { useState } from "react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";

import { useCategories } from "../hooks/useCategories";
import { useForm } from "../hooks/useForm";

import { AdminLayout } from "../components/AdminLayout";
import { Table } from "../components/Table";
import { Dialog } from "../components/Dialog";
import { useApi } from "../hooks/useApi";

import { CATEGORIES_URL } from "../utils/urls";
import { STATUS_CODES } from "../utils/statusCodes";

export function Categories() {

    const { categories, setCategories, loadingCategories } = useCategories()
    const { formData, handleChange, validate, reset, disabled, setDisabled, errors } = useForm({
        defaultData: {
            id: '',
            name: ''
        },
        rules: {
            name: {
                required: true,
                maxLength: 55
            }
        }
    })
    const { post } = useApi(CATEGORIES_URL)
    const [open, setOpen] = useState(null)

    const handleOpen = () => {
        const dialog = document.querySelector('dialog')
        dialog.showModal()
    }

    const handleClose = () => {
        const dialog = document.querySelector('dialog')
        dialog.close()
        setOpen(null)
        reset()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            const { status, data } = await post(formData)
            if (status === STATUS_CODES.OK) {
                setCategories([data, ...categories])
                handleClose()
            } else {
                console.log(data.message)
            }
        }
    }

    const columns = [
        {
            label: '#',
            accessor: 'id'
        },
        {
            label: 'Nombre',
            accessor: 'name'
        },
        {
            label: '',
            accessor: (row) => (
                <>
                    <button className="actions"><MdEdit /></button>
                    <button className="actions"><MdDelete /></button>
                </>
            )
        }

    ]

    return (
        <AdminLayout>
            <div className="adminPageHeader">
                <h2>Categorías</h2>
                <button className="addBtn" onClick={handleOpen}><MdAdd /></button>
            </div>
            <Dialog open={open === 'NEW' || open === 'EDIT'}>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} />
                        {errors.name?.type === 'required' && <small>* El nombre es requerido.</small>}
                        {errors.name?.type === 'maxLength' && <small>* El nombre es demasiado largo.</small>}
                    </div>
                    <div className="form-footer">
                        <button type="button" className="cancel-button" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button type="submit" onClick={handleSubmit} disabled={disabled}>
                            Guardar
                        </button>
                    </div>
                </form>
            </Dialog>
            <Table
                columns={columns}
                rows={categories}
                width="60%"
            />
        </AdminLayout>
    )
}