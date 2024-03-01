import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import toast from "react-hot-toast";

import { useCategories } from "../hooks/useCategories";
import { useForm } from "../hooks/useForm";
import { useApi } from "../hooks/useApi";

import { AdminLayout } from "../components/AdminLayout";
import { Table } from "../components/Table";
import { Dialog } from "../components/Dialog";
import { Loader } from "../components/Loader";

import { CATEGORIES_URL } from "../utils/urls";
import { STATUS_CODES } from "../utils/statusCodes";
import { useState } from "react";

export function Categories() {

    const { categories, setCategories, loadingCategories } = useCategories()
    const { formData, handleChange, validate, reset, setFormData, disabled, setDisabled, errors } = useForm({
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
    const { post, put, destroy } = useApi(CATEGORIES_URL)
    const [action, setAction] = useState(null)

    const handleOpen = (type) => {
        const dialog = document.querySelector(`.${type}`)
        dialog.showModal()
    }

    const handleClose = (type) => {
        const dialog = document.querySelector(`.${type}`)
        dialog?.close()
        setAction(null)
        reset()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            const { status, data } = action === 'NEW' ? await post(formData) : await put(formData)
            if (status === STATUS_CODES.OK) {
                if (action === 'NEW') setCategories([data, ...categories])
                if (action === 'EDIT') setCategories([data, ...categories.filter(cat => cat.id !== data.id)])
                handleClose('new-edit')
                toast.success(`Categoría ${action === 'NEW' ? 'creada' : 'editada'} correctamente.`)
            } else {
                setDisabled(false)
                toast.error(data.message)
            }
        }
    }

    const handleDelete = async () => {
        const { status, data } = await destroy(formData)
        if (status === STATUS_CODES.OK) {
            setCategories([...categories.filter(cat => cat.id !== data.id)])
            handleClose('delete')
            toast.success('Categoría eliminada correctamente.')
        } else {
            setDisabled(false)
            toast.error(data.message)
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
                    <button
                        className="actions"
                        onClick={() => {
                            setFormData(row)
                            setAction('EDIT')
                            handleOpen('new-edit')
                        }}
                    >
                        <MdEdit />
                    </button>
                    <button
                        className="actions"
                        onClick={() => {
                            setFormData(row)
                            handleOpen('delete')
                        }}
                    >
                        <MdDelete />
                    </button>
                </>
            )
        }

    ]

    return (
        <AdminLayout>
            {disabled || loadingCategories ?
                <Loader /> :
                <>
                    <div className="adminPageHeader">
                        <h2>Categorías</h2>
                        <button
                            className="addBtn"
                            onClick={() => {
                                setAction('NEW')
                                handleOpen('new-edit')
                            }}
                        >
                            <MdAdd />
                        </button>
                    </div>
                    <Dialog type="new-edit">
                        <h3>{action === 'NEW' ? 'Nueva categoría' : `Editar la categoría #${formData.id}`}</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} />
                                {errors.name?.type === 'required' && <small>* El nombre es requerido.</small>}
                                {errors.name?.type === 'maxLength' && <small>* El nombre es demasiado largo.</small>}
                            </div>
                            <div className="form-footer">
                                <button type="button" className="cancel-button" onClick={() => handleClose('new-edit')}>
                                    Cancelar
                                </button>
                                <button type="submit" onClick={handleSubmit} disabled={disabled}>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </Dialog>
                    <Dialog type="delete">
                        <h3>¿Borrar la categoría {formData.name}?</h3>
                        <div className="form-footer">
                            <button type="submit" onClick={handleDelete}>
                                Confirmar
                            </button>
                            <button type="button" className="cancel-button" onClick={() => handleClose('delete')}>
                                Cancelar
                            </button>
                        </div>
                    </Dialog>
                    <Table
                        columns={columns}
                        rows={categories}
                        width="60%"
                    />
                </>
            }
        </AdminLayout>
    )
}