import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import { format } from 'date-fns'

import { useAds } from "../hooks/useAds";
import { useCategories } from "../hooks/useCategories";
import { useForm } from "../hooks/useForm";
import { useApi } from "../hooks/useApi";

import { Sidebar } from "../components/Sidebar";
import { Dialog } from "../components/Dialog";
import { Loader } from "../components/Loader";
import { AddOrEditAd } from "../components/AddOrEditAd";
import { AdsContainer } from "../components/AdsContainer";

import { ADS_URL } from "../utils/urls";
import { STATUS_CODES } from "../utils/statusCodes";

export function Home() {

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
                maxLength: 255
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
    const { post } = useApi(ADS_URL)
    const [action, setAction] = useState(null)
    const [filter, setFilter] = useState({
        content: '',
        category_id: '',
        province: '',
        city: '',
        from: '',
        to: ''
    })
    const [page, setPage] = useState(0)
    const { ads, setAds, loadingAds, provinces, cities, getCities, getAds, count } = useAds({
        includeInvisibles: false,
        filter,
        page
    })

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
            const { status, data } = await post(formData)
            if (status === STATUS_CODES.OK) {
                setAds([data, ...ads])
                handleClose('new-edit')
                toast.success('Aviso creado correctamente.')
            } else {
                setDisabled(false)
                toast.error(data.message)
            }
        }
    }

    useEffect(() => {
        if (formData.province.length > 0) {
            getCities(provinces.find(p => p.nombre === formData.province)?.id)
        } else {
            setFormData({ ...formData, city: '' })
        }
    }, [formData.province, provinces])

    useEffect(() => {
        if (filter.province.length > 0) {
            getCities(provinces.find(p => p.nombre === filter.province)?.id)
        } else {
            setFilter({ ...filter, city: '' })
        }
    }, [filter.province, provinces])

    const handleChangeFilter = e => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const handleReset = () => {
        setFilter({
            content: '',
            category_id: '',
            province: '',
            city: '',
            from: '',
            to: ''
        })
    }

    const handleSubmitFilter = async () => {
        await getAds()
    }

    useEffect(() => {
        getAds()
    }, [page])

    return (
        <>
            {disabled || loadingAds || loadingCategories ?
                <Loader /> :
                <>
                    <Sidebar childrenType="FILTROS" handleSubmit={handleSubmitFilter} handleReset={handleReset}>
                        <li className="filterField">
                            <label htmlFor="content">Palabras clave</label>
                            <input type="text" id="content" name="content" value={filter.content} onChange={handleChangeFilter} />
                        </li>
                        <li className="filterField">
                            <label htmlFor="category_id">Categoría</label>
                            <select name="category_id" id="category_id" value={filter.category_id} onChange={handleChangeFilter}>
                                <option value="">Seleccione</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </li>
                        <li className="filterField">
                            <label htmlFor="province">Provincia</label>
                            <select name="province" id="province" value={filter.province} onChange={handleChangeFilter}>
                                <option value="">Seleccione</option>
                                {provinces.map(p => (
                                    <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                ))}
                            </select>
                        </li>
                        <li className="filterField">
                            <label htmlFor="city">Ciudad</label>
                            <select name="city" id="city" value={filter.city} onChange={handleChangeFilter}>
                                <option value="">Seleccione</option>
                                {cities.map(c => (
                                    <option key={c.id} value={c.nombre}>{c.nombre}</option>
                                ))}
                            </select>
                        </li>
                        <li className="filterField">
                            <label htmlFor="from">Desde</label>
                            <input type="date" name="from" id="from" value={filter.from} onChange={handleChangeFilter} />
                        </li>
                        <li className="filterField">
                            <label htmlFor="to">Hasta</label>
                            <input type="date" name="to" id="to" value={filter.to} onChange={handleChangeFilter} />
                        </li>
                    </Sidebar>
                    <section className="homeHeader">
                        <button
                            className="addBtn"
                            onClick={() => {
                                setAction('NEW')
                                handleOpen('new-edit')
                            }}
                        >
                            <MdAdd />
                        </button>
                    </section>
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
                    />
                    <AdsContainer
                        ads={ads}
                        count={count}
                        page={page}
                        setPage={setPage}
                    />
                </>
            }
        </>
    )
}