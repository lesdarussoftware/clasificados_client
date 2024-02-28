import { useEffect, useState } from "react";

import { useApi } from "./useApi";

import { CATEGORIES_URL } from '../utils/urls'

export function useCategories() {

    const { get } = useApi(CATEGORIES_URL)

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        getCategories()
    }, [])

    async function getCategories() {
        const { status, data } = await get()
        if (status === 200) {
            setCategories(data)
            setLoadingCategories(false)
        }
    }

    return {
        categories,
        loadingCategories,
        setLoadingCategories,
        getCategories
    }
}