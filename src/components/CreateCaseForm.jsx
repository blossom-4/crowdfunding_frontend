import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postCreateCase from "../api/post-createcase.js";
import "./CreateCaseForm.css"; // optional, for styling below

function CreateCaseForm() {
    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");

    if (!token) {
        return <p>Please log in to create a case.</p>;
    }

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        is_open: true,
    });

    const [status, setStatus] = useState({
        loading: false,
        error: "",
        success: "",
    });

    const handleChange = (e) => {
        setStatus({ loading: false, error: "", success: "" });
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: "", success: "" });

        if (formData.title.trim().length < 5) {
            setStatus({ loading: false, error: "Title must be at least 5 characters", success: "" });
            return;
        }

        if (formData.description.trim().length < 20) {
            setStatus({ loading: false, error: "Description must be at least 20 characters", success: "" });
            return;
        }

        if (formData.image.trim() && !isValidUrl(formData.image)) {
            setStatus({ loading: false, error: "Please enter a valid image URL", success: "" });
            return;
        }

        try {
            await postCreateCase(formData, token);
            setStatus({ loading: false, error: "", success: "Case created successfully!" });
            navigate("/cases");
        } catch (err) {
            setStatus({ loading: false, error: err.message || "Error creating case", success: "" });
        }
    };

    const isValidUrl = (urlString) => {
        try {
            new URL(urlString);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="create-case-container">
            <h1 className="create-case-title">Raise your case</h1>
            <p className="create-case-blurb">
                Here, justice isn't decided in marble halls — the public court is now in session.
                From petty crimes to great injustices, this is your chance to defend your name,
                your choices, or your cat’s strange behavior. Submit your case, state your argument,
                and let the people decide if you’re guilty or innocent.
            </p>

            <form onSubmit={handleSubmit} className="create-case-form">
                <div>
                    <label htmlFor="title">Case Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter case title"
                        aria-required="true"
                        aria-describedby="title-help"
                        required
                    />
                    <small id="title-help">Minimum 5 characters</small>
                </div>

                <div>
                    <label htmlFor="description">State your case:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter case details"
                        maxLength="5000"
                        aria-required="true"
                        aria-describedby="description-help"
                        required
                    />
                    <small id="description-help">{formData.description.length}/5000 characters</small>
                </div>

                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="url"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        aria-describedby="image-help"
                    />
                    <small id="image-help">Optional. Must be a valid URL if provided.</small>
                </div>

                <div>
                    <label htmlFor="is_open">
                        <input
                            type="checkbox"
                            id="is_open"
                            checked={formData.is_open}
                            onChange={handleChange}
                        />
                        Case is open for verdicts
                    </label>
                </div>

                <button type="submit" disabled={status.loading}>
                    {status.loading ? "Submitting..." : "Create Case"}
                </button>

                {status.error && <p className="error">{status.error}</p>}
                {status.success && <p className="success">{status.success}</p>}
            </form>
        </div>
    );
}

export default CreateCaseForm;