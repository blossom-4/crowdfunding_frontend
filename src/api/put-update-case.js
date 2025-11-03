async function putCase(caseId, token, caseData) {
    const url = `${import.meta.env.VITE_API_URL}/cases/${caseId}/`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(caseData),
    });

    if (!response.ok) {
        const fallbackError = `Error updating case`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default putCase;