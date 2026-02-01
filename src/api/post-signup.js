async function postSignup(username, email, firstName, lastName, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to sign up`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postSignup;
