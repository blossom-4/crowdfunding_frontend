import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import getUserCases from "../api/get-user-cases.js";
import getUserJudgments from "../api/get-user-judgments.js";
import putUpdateUser from "../api/put-update-user.js";
import deleteAccount from "../api/delete-account.js";
import "./UserPage.css";

function UserPage() {
    const navigate = useNavigate();
    const { auth, clearAuth } = useAuth();
    const [stats, setStats] = useState({ cases_count: 0, judgments_count: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateData, setUpdateData] = useState({
        username: auth?.username || "",
        password: "",
        confirmPassword: "",
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");

    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
            return;
        }
        fetchUserStats();
    }, [auth?.token]);

    const fetchUserStats = async () => {
        try {
            setLoading(true);
            setError("");
            console.log("Fetching user stats with token:", auth?.token);
            console.log("Current user ID:", auth?.userId);
            const [casesData, judgmentsData] = await Promise.all([
                getUserCases(auth.token),
                getUserJudgments(auth.token),
            ]);

            console.log("Cases data:", casesData);
            console.log("Judgments data:", judgmentsData);

            // Filter cases where owner matches current user ID
            const userCases = casesData.filter(
                (caseItem) => caseItem.owner === parseInt(auth.userId)
            );

            // Filter judgments where supporter matches current user ID
            const userJudgments = judgmentsData.filter(
                (judgment) => judgment.supporter === parseInt(auth.userId)
            );

            console.log("Filtered user cases:", userCases);
            console.log("Filtered user judgments:", userJudgments);
            console.log("User stats calculated:", {
                cases_count: userCases.length,
                judgments_count: userJudgments.length,
            });

            setStats({
                cases_count: userCases.length,
                judgments_count: userJudgments.length,
            });
        } catch (err) {
            console.error("Error fetching stats:", err);
            setError(err.message || "Failed to load user stats");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
        setSuccessMessage("");
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!updateData.username) {
            setError("Username is required");
            return;
        }

        if (updateData.password) {
            if (updateData.password.length < 6) {
                setError("Password must be at least 6 characters");
                return;
            }
            if (updateData.password !== updateData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
        }

        try {
            await putUpdateUser(auth.token, {
                username: updateData.username,
                password: updateData.password || undefined,
            });
            setSuccessMessage("Profile updated successfully!");
            setShowUpdateForm(false);
            setUpdateData({
                username: updateData.username,
                password: "",
                confirmPassword: "",
            });
        } catch (err) {
            setError(err.message || "Failed to update profile");
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== "DELETE") {
            setError("Please type DELETE to confirm");
            return;
        }

        try {
            await deleteAccount(auth.token);
            clearAuth();
            navigate("/");
        } catch (err) {
            setError(err.message || "Failed to delete account");
        }
    };

    if (loading) {
        return <div className="user-page"><p>Loading...</p></div>;
    }

    if (error) {
        return (
            <div className="user-page">
                <div className="user-container">
                    <h1>User Settings</h1>
                    <div className="error-message">
                        <p><strong>Error:</strong> {error}</p>
                        <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                            Sorry there has been an issue with retireving your portfolio information, please log out and try again. Thank you for undertanding Raise the Case Team.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="user-page">
            <div className="user-container">
                <h1>User Settings</h1>
                <p className="greeting-message">Hello {auth?.username},</p>

                <section className="stats-section">
                    <h2>Your Activity</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <p className="stat-label">Cases Opened</p>
                            <p className="stat-value">{stats.cases_count}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Judgments Made</p>
                            <p className="stat-value">{stats.judgments_count}</p>
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <h2>Profile</h2>
                    <div className="profile-info">
                        <p><strong>Username:</strong> {updateData.username}</p>
                    </div>
                    {!showUpdateForm ? (
                        <button
                            className="btn-secondary"
                            onClick={() => setShowUpdateForm(true)}
                        >
                            Update Username or Password
                        </button>
                    ) : (
                        <form className="update-form" onSubmit={handleUpdateSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={updateData.username}
                                    onChange={handleUpdateChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">New Password (optional):</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={updateData.password}
                                    onChange={handleUpdateChange}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={updateData.confirmPassword}
                                    onChange={handleUpdateChange}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            <div className="form-buttons">
                                <button type="submit" className="btn-primary">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => {
                                        setShowUpdateForm(false);
                                        setError("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </section>

                <section className="danger-section">
                    <h2>Danger Zone</h2>
                    {!showDeleteConfirm ? (
                        <button
                            className="btn-danger"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Delete Account
                        </button>
                    ) : (
                        <div className="delete-confirm-form">
                            <p className="warning-text">
                                ⚠️ This action cannot be undone. All your account data will be permanently deleted.
                            </p>
                            <p>Type <strong>DELETE</strong> to confirm:</p>
                            <input
                                type="text"
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                placeholder="Type DELETE to confirm"
                                className="delete-input"
                            />
                            <div className="delete-buttons">
                                <button
                                    className="btn-danger"
                                    onClick={handleDeleteAccount}
                                >
                                    Permanently Delete Account
                                </button>
                                <button
                                    className="btn-cancel"
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setDeleteConfirmation("");
                                        setError("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {error && <div className="error-message">{error}</div>}
                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
            </div>
        </div>
    );
}

export default UserPage;
