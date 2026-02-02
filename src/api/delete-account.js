async function deleteAccount(token) {
    const url = `${import.meta.env.VITE_API_URL}/user/profile/`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    });

    if (!response.ok) {
        const fallbackError = "Error deleting account";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    // DELETE requests might not return JSON
    return response.status === 204 ? {} : await response.json();
}

export default deleteAccount;
