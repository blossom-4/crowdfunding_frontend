import { useState, useEffect } from "react";
import getJudgements from "../api/get-judgements.js";

export function useJudgementCount(caseId, token) {
    const [guiltyCount, setGuiltyCount] = useState(0);
    const [notGuiltyCount, setNotGuiltyCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!caseId) return;

        const fetchJudgements = async () => {
            setLoading(true);
            setError(null);
            try {
                const judgements = await getJudgements(caseId, token);
                const guilty = judgements.filter((j) => j.verdict === true).length;
                const notGuilty = judgements.filter((j) => j.verdict === false).length;
                setGuiltyCount(guilty);
                setNotGuiltyCount(notGuilty);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJudgements();
    }, [caseId, token]);

    return { guiltyCount, notGuiltyCount, loading, error };
}