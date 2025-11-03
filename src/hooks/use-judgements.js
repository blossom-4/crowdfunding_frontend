import { useState, useEffect } from "react";
import getJudgements from "../api/get-judgements";

export default function useJudgements(caseId) {
    const [judgements, setJudgements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!caseId) return;

        async function load() {
            try {
                const data = await getJudgements(caseId);
                setJudgements(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        load();
    }, [caseId]);

    return { judgements, isLoading, error, setJudgements };
}