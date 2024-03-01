import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import { format } from 'date-fns'

import { useAds } from "../hooks/useAds";
import { useCategories } from "../hooks/useCategories";
import { useForm } from "../hooks/useForm";
import { useApi } from "../hooks/useApi";

import { AdminLayout } from "../components/AdminLayout";
import { Table } from "../components/Table";
import { Dialog } from "../components/Dialog";
import { Loader } from "../components/Loader";
import { AddOrEditAd } from "../components/AddOrEditAd";

import { ADS_URL } from "../utils/urls";
import { STATUS_CODES } from "../utils/statusCodes";

export function Ads() {

    const { ads, setAds, loadingAds, provinces, cities, getCities } = useAds()
    const { categories, loadingCategories } = useCategories()
    const { formData, handleChange, validate, reset, setFormData, disabled, setDisabled, errors } = useForm({
        defaultData: {
            id: '',
            content: '',
            file: '',
            is_visible: false,
            province: '',
            city: '',
            address: '',
            phone: '',
            email: '',
            link: '',
            lat: '',
            lng: '',
            duration: 1,
            category_id: ''
        },
        rules: {
            content: {
                maxLength: 225
            },
            file: {
                maxLength: 55
            },
            province: {
                required: true
            },
            city: {
                required: true
            },
            address: {
                maxLength: 55
            },
            phone: {
                maxLength: 55
            },
            email: {
                maxLength: 55
            },
            link: {
                maxLength: 55
            },
            category_id: {
                required: true
            }
        }
    })
    const { post, put, destroy } = useApi(ADS_URL)
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
                if (action === 'NEW') setAds([data, ...ads])
                if (action === 'EDIT') setAds([data, ...ads.filter(a => a.id !== data.id)])
                handleClose('new-edit')
                toast.success(`Aviso ${action === 'NEW' ? 'creado' : 'editado'} correctamente.`)
            } else {
                setDisabled(false)
                toast.error(data.message)
            }
        }
    }

    const handleDelete = async () => {
        const { status, data } = await destroy(formData)
        if (status === STATUS_CODES.OK) {
            setAds([...ads.filter(a => a.id !== data.id)])
            handleClose('delete')
            toast.success('Aviso eliminado correctamente.')
        } else {
            setDisabled(false)
            toast.error(data.message)
        }
    }

    useEffect(() => {
        if (formData.province.length > 0) {
            getCities(provinces.find(p => p.nombre === formData.province)?.id)
        } else {
            setFormData({ ...formData, city: '' })
        }
    }, [formData.province, provinces])

    const columns = [
        {
            label: '#',
            accessor: 'id'
        },
        {
            label: 'Contenido',
            accessor: 'content'
        },
        {
            label: 'Archivo',
            accessor: 'file'
        },
        {
            label: 'Visible',
            accessor: (row) => row.is_visible ? 'Sí' : 'No'
        },
        {
            label: 'Ciudad',
            accessor: 'city'
        },
        {
            label: 'Provincia',
            accessor: 'province'
        },
        {
            label: 'Dirección',
            accessor: 'address'
        },
        {
            label: 'Teléfono',
            accessor: 'phone'
        },
        {
            label: 'Email',
            accessor: 'email'
        },
        {
            label: 'Enlace',
            accessor: 'link'
        },
        {
            label: 'Categoría',
            accessor: (row) => row.category.name
        },
        {
            label: 'Creado',
            accessor: (row) => format(new Date(row.created_at), 'dd/MM/yy')
        },
        {
            label: 'Duración',
            accessor: (row) => `${row.duration} días`
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
            {disabled || loadingAds || loadingCategories ?
                <Loader /> :
                <>
                    <div className="adminPageHeader">
                        <h2>Avisos</h2>
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
                    <AddOrEditAd
                        action={action}
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                        errors={errors}
                        disabled={disabled}
                        categories={categories}
                        provinces={provinces}
                        cities={cities}
                        isPrivate
                    />
                    <Dialog type="delete">
                        <h3>¿Borrar el usuario {formData.username}?</h3>
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
                        rows={ads}
                        width="60%"
                    />
                </>
            }
        </AdminLayout>
    )
}