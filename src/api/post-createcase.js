export default async function postCreateCase(data, token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cases/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({       
                "title": data.title,
                "description": data.description,
                "image": data.image,
                "is_open": data.is_open,
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.detail || errorData.message || "Failed to create case"
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating case:", error);
        throw error;
    }
}