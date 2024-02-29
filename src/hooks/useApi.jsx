export function useApi(URL) {

    async function get() {
        try {
            const res = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            return { status: res.status, data }
        } catch (err) {
            console.log(err)
        }
    }

    async function post(formData) {
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            return { status: res.status, data }
        } catch (err) {
            console.log(err)
        }
    }

    return { get, post }
}