import { useState, useEffect } from "react";
import getCase from "../api/get-case.js";

export default function useCase(itemId, refreshKey = 0) {
    const [item, setItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!itemId) return;

        setIsLoading(true);
        setError(null);

        getCase(itemId)
            .then((data) => {
                setItem(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [itemId, refreshKey]);  

    return { item, isLoading, error };
}