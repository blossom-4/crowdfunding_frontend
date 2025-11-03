import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import putCase from "../api/put-update-case.js";

function EditCaseForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true,
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/cases/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCaseData(data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCaseData((prevCase) => ({
            ...prevCase,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem("token");

        if (token) {
            try {
                await putCase(id, token, caseData);
                navigate(`/case/${id}`);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={caseData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={caseData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image URL:</label>
                <input
                    type="url"
                    id="image"
                    value={caseData.image}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Case</button>
        </form>
    );
}

export default EditCaseForm;