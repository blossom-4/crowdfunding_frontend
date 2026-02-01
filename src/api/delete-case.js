async function deleteCase(caseId, token) {
    const url = `${import.meta.env.VITE_API_URL}/cases/${caseId}/`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`,
        },
    });

    if (!response.ok) {
        const fallbackError = `Error deleting case`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return { success: true };
}

export default deleteCase;
