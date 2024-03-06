import { useEffect, useState } from "react";

import { useApi } from "./useApi";

import { ADS_URL } from '../utils/urls'

export function useAds({ includeInvisibles }) {

    const { get } = useApi(ADS_URL + (includeInvisibles ? '/all' : ''))

    const [ads, setAds] = useState([])
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [loadingAds, setLoadingAds] = useState(true)

    useEffect(() => {
        getAds()
        getProvinces()
    }, [])

    async function getAds() {
        const { status, data } = await get()
        if (status === 200) {
            setAds(data)
            setLoadingAds(false)
        }
    }

    async function getProvinces() {
        const PROVINCES_URL = 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre'
        const res = await fetch(PROVINCES_URL)
        const { provincias } = await res.json()
        setProvinces(provincias.sort((a, b) => {
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
        cities
    }
}