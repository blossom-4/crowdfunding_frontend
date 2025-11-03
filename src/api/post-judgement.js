export default async function postJudgement({ caseId, verdict, comment, anonymous, token }) {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const url = `${API_BASE_URL}/judgements/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
            case: caseId,
            verdict,
            comment,
            anonymous,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to submit judgement (${response.status}): ${text}`);
    }

    return await response.json();
}