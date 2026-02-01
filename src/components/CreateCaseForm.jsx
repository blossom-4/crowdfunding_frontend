import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import postCreateCase from "../api/post-createcase.js";
import "./CreateCaseForm.css";

function CreateCaseForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = window.localStorage.getItem("token");
    const redirectState = useMemo(
        () => ({ from: location.pathname + location.search }),
        [location.pathname, location.search]
    );

    // If not authenticated: show a real UX page instead of a plain <p>
    if (!token) {
        return (
            <div className="create-case-container">
                <h1 className="create-case-title">Sign in required</h1>

                <p className="create-case-blurb">
                    You need an account to raise a case. Log in to continue, or create an account in seconds.
                </p>

                <div className="auth-gate-card" role="region" aria-label="Authentication required">
                    <div className="auth-gate-actions">
                        <Link
                            to="/login"
                            state={redirectState}
                            className="auth-gate-btn auth-gate-btn-primary"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/signup"
                            state={redirectState}
                            className="auth-gate-btn auth-gate-btn-secondary"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <p className="auth-gate-note">
                        After signing in, you’ll be brought back here to finish your case.
                    </p>

                    <div className="auth-gate-links">
                        <Link to="/" className="auth-gate-link">
                            Browse cases instead
                        </Link>
                        <span className="auth-gate-dot">•</span>
                        <Link to="/about" className="auth-gate-link">
                            Learn more
                        </Link>
                    </div>
                </div>
            </div>
        );
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

    const isValidUrl = (urlString) => {
        try {
            new URL(urlString);
            return true;
        } catch {
            return false;
        }
    };

    const titleError =
        formData.title.trim().length > 0 && formData.title.trim().length < 5
            ? "Title must be at least 5 characters."
            : "";

    const descriptionError =
        formData.description.trim().length > 0 && formData.description.trim().length < 20
            ? "Description must be at least 20 characters."
            : "";

    const imageError =
        formData.image.trim().length > 0 && !isValidUrl(formData.image.trim())
            ? "Please enter a valid image URL."
            : "";

    const canSubmit =
        !status.loading &&
        !titleError &&
        !descriptionError &&
        !imageError &&
        formData.title.trim().length >= 5 &&
        formData.description.trim().length >= 20;

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

        // Final validation guard
        if (!canSubmit) {
            setStatus({
                loading: false,
                error: "Please fix the fields highlighted below before submitting.",
                success: "",
            });
            return;
        }

        try {
            await postCreateCase(
                {
                    ...formData,
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    image: formData.image.trim(),
                },
                token
            );

            setStatus({ loading: false, error: "", success: "Case created successfully!" });

            // take user to cases list (or change to the new case route if your API returns it)
            navigate("/cases");
        } catch (err) {
            setStatus({
                loading: false,
                error: err?.message || "Error creating case",
                success: "",
            });
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

            <form onSubmit={handleSubmit} className="create-case-form" noValidate>
                {/* Title */}
                <div className={`field ${titleError ? "field-error" : ""}`}>
                    <label htmlFor="title">Case Title</label>
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
                    {titleError && <p className="error" role="alert">{titleError}</p>}
                </div>

                {/* Description */}
                <div className={`field ${descriptionError ? "field-error" : ""}`}>
                    <label htmlFor="description">State your case</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter case details"
                        maxLength={5000}
                        aria-required="true"
                        aria-describedby="description-help"
                        required
                    />
                    <small id="description-help">{formData.description.length}/5000 characters</small>
                    {descriptionError && <p className="error" role="alert">{descriptionError}</p>}
                </div>

                {/* Image */}
                <div className={`field ${imageError ? "field-error" : ""}`}>
                    <label htmlFor="image">Image URL (optional)</label>
                    <input
                        type="url"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        aria-describedby="image-help"
                    />
                    <small id="image-help">Optional. Must be a valid URL if provided.</small>
                    {imageError && <p className="error" role="alert">{imageError}</p>}
                </div>

                {/* Open/closed */}
                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            id="is_open"
                            checked={formData.is_open}
                            onChange={handleChange}
                        />
                        Case is open for verdicts
                    </label>
                </div>

                <button type="submit" disabled={!canSubmit}>
                    {status.loading ? "Submitting..." : "Create Case"}
                </button>

                {status.error && <p className="error" role="alert">{status.error}</p>}
                {status.success && <p className="success" role="status">{status.success}</p>}
            </form>
        </div>
    );
}

export default CreateCaseForm;