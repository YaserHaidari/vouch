

export const Deals = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_STAGING_URL
    const response = await fetch(`${baseUrl}/api/fetchAllDeals`, {
        method: 'POST'
    })
    if(!response.ok){
        const error = await response.text()
        console.log(error)
    } else {
        const {data} = await response.json()
        return data
    }
}