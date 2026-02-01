import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import putCase from "../api/put-update-case.js";
import "./EditCasePage.css";

function EditCaseForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [caseData, setCaseData] = useState({
        title: "",
        description: "",
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
        const { id, value, type, checked } = e.target;
        setCaseData((prevCase) => ({
            ...prevCase,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        
        const token = window.localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to edit this case");
            setLoading(false);
            return;
        }

        try {
            await putCase(id, token, caseData);
            setSuccess("Case updated successfully!");
            setTimeout(() => navigate(`/case/${id}`), 1500);
        } catch (err) {
            setError(err.message || "Failed to update case");
            setLoading(false);
        }
    };

    return (
        <div className="edit-case-container">
            <h1 className="edit-case-title">Edit Your Case</h1>
            <p className="edit-case-blurb">Update your case details to keep the public informed.</p>

            <form className="edit-case-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="title">Case Title</label>
                    <input
                        type="text"
                        id="title"
                        value={caseData.title}
                        onChange={handleChange}
                        placeholder="Enter case title"
                        required
                    />
                    <small>Maximum 200 characters</small>
                </div>

                <div className="field">
                    <label htmlFor="description">Case Description</label>
                    <textarea
                        id="description"
                        value={caseData.description}
                        onChange={handleChange}
                        placeholder="Describe your case in detail"
                        required
                    />
                    <small>{caseData.description?.length || 0}/5000 characters</small>
                </div>

                <div className="field">
                    <label htmlFor="image">Image URL (optional)</label>
                    <input
                        type="url"
                        id="image"
                        value={caseData.image || ""}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                    <small>Must be a valid URL if provided</small>
                </div>

                <div className="checkbox-field">
                    <input
                        type="checkbox"
                        id="is_open"
                        checked={caseData.is_open}
                        onChange={handleChange}
                    />
                    <label htmlFor="is_open">Case is open for verdicts</label>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Case"}
                </button>

                {error && <p className="error" role="alert">{error}</p>}
                {success && <p className="success" role="status">{success}</p>}
            </form>
        </div>
    );
}

export default EditCaseForm;