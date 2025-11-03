
export default async function getJudgements(caseId) {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const url = `${API_BASE_URL}/judgements/?case=${caseId}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch judgements (${response.status}): ${text}`);
    }

    const data = await response.json();
    return data.filter((j) => j.case == caseId);
}