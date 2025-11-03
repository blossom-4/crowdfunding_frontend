import { useState, useEffect } from "react";
import getCases from "../api/get-cases";

export default function useCases() {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getCases()
            .then((cases) => {
                setCases(cases);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return { cases, isLoading, error };
}