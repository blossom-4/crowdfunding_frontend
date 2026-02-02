async function putUpdateUser(token, updateData) {
    const url = `${import.meta.env.VITE_API_URL}/user/profile/`;

    const body = {
        username: updateData.username,
    };

    // Only include password if it's provided
    if (updateData.password) {
        body.password = updateData.password;
    }

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const fallbackError = "Error updating user profile";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default putUpdateUser;
