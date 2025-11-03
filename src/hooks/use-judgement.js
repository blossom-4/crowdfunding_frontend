import { useState, useEffect } from "react";
import getJudgements from "../api/get-judgements";

export default function useJudgements(caseId) {
    const [judgements, setJudgements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!caseId) return;

        getJudgements(caseId)
            .then((data) => {
                setJudgements(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [caseId]);

    return { judgements, isLoading, error, setJudgements };
}