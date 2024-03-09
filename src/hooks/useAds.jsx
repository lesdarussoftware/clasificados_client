import { useEffect, useState } from "react";

import { useApi } from "./useApi";

import { ADS_URL } from '../utils/urls'

export function useAds({ includeInvisibles, filter, page }) {

    const setFilters = () => {
        let result = ''
        if (filter.content) result += `${result.length > 0 ? '&' : '?'}content=${filter.content}`
        if (filter.category_id) result += `${result.length > 0 ? '&' : '?'}category_id=${filter.category_id}`
        if (filter.province) result += `${result.length > 0 ? '&' : '?'}province=${filter.province}`
        if (filter.city) result += `${result.length > 0 ? '&' : '?'}city=${filter.city}`
        if (filter.from) result += `${result.length > 0 ? '&' : '?'}from=${filter.from}`
        if (filter.to) result += `${result.length > 0 ? '&' : '?'}to=${filter.to}`
        return result
    }

    const { get } = useApi(ADS_URL + (includeInvisibles ? '/all' : '') + (filter ? setFilters() : '') + (page ? `?page=${page}` : ''))

    const [ads, setAds] = useState([])
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [loadingAds, setLoadingAds] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        getAds()
        getProvinces()
    }, [])

    async function getAds() {
        const { status, data } = await get()
        if (status === 200) {
            setAds(data[0])
            setCount(data[1])
            setLoadingAds(false)
        }
    }

    async function getProvinces() {
        const PROVINCES_URL = 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre'
        const res = await fetch(PROVINCES_URL)
        const { provincias } = await res.json()
        setProvinces(provincias.filter(p => {
            const names = ['Jujuy', 'Salta', 'Catamarca', 'Tucumán']
            return names.includes(p.nombre)
        }).sort((a, b) => {
            if (a.nombre > b.nombre) return 1
            if (a.nombre < b.nombre) return -1
            return 0
        }))
    }

    async function getCities(province) {
        const CITIES_URL = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${province}&campos=id,nombre&max=3000`
        const res = await fetch(CITIES_URL)
        const { municipios } = await res.json()
        setCities(municipios.sort((a, b) => {
            if (a.nombre > b.nombre) return 1
            if (a.nombre < b.nombre) return -1
            return 0
        }))
    }

    return {
        ads,
        setAds,
        loadingAds,
        setLoadingAds,
        getAds,
        provinces,
        getCities,
        cities,
        count
    }
}