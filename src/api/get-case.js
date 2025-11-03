async function getCase(itemId){
    const url = `${import.meta.env.VITE_API_URL}/cases/${itemId}/`;

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError = `Error fetching case with id ${itemId}`;
        const data = await response.json().catch(()=> {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage); 
    }
    return await response.json();
}
export default getCase;