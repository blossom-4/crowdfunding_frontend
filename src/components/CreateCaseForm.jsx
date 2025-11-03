import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postCreateCase from "../api/post-createcase.js";
import "./CreateCaseForm.css"; // optional, for styling below

function CreateCaseForm() {
    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");

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
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: "", success: "" });

        try {
            await postCreateCase(formData, token);
            setStatus({ loading: false, error: "", success: "Case created successfully!" });
            navigate("/cases"); // redirect after success
        } catch (err) {
            setStatus({ loading: false, error: err.message || "Error creating case", success: "" });
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
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">State your case:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter case details"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="url"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
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