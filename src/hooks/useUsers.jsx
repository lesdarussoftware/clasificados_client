import { useEffect, useState } from "react";

import { useApi } from "./useApi";

import { USERS_URL } from '../utils/urls'

export function useUsers() {

    const { get } = useApi(USERS_URL)

    const [users, setUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(true)

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers() {
        const { status, data } = await get()
        if (status === 200) {
            setUsers(data)
            setLoadingUsers(false)
        }
    }

    return {
        users,
        setUsers,
        loadingUsers,
        setLoadingUsers,
        getUsers
    }
}