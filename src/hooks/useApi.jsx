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

    return { get }
}