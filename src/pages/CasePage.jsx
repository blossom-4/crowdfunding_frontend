import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useCase from "../hooks/use-case.js";
import useJudgements from "../hooks/use-judgements.js";
import { useAuth } from "../hooks/use-auth.js";
import deleteCase from "../api/delete-case.js";
import ConfirmModal from "../components/ConfirmModal.jsx";
import JudgementForm from "../components/JudgementForm.jsx";
import JudgementCount from "../components/JudgementCount.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import "./CasePage.css";

function CasePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { item, isLoading, error } = useCase(id);
    const { judgements, isLoading: loadingJ, error: errorJ } = useJudgements(id);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (isLoading) return <p>Loading case...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Check if current user is the case owner
    const isOwner = auth?.userId && item?.owner === parseInt(auth.userId);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            setIsDeleting(true);
            setDeleteError("");
            setShowDeleteModal(false);
            await deleteCase(id, auth.token);
            navigate("/");
        } catch (err) {
            setDeleteError(err.message || "Failed to delete case");
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    // Count judgements
    const guiltyCount = judgements.filter(j => j.verdict).length;
    const notGuiltyCount = judgements.filter(j => !j.verdict).length;

    return (
        <div className="container">

            <div className="case-judgment-container">

                <div className="case-content">
                    <h2>{item.title}</h2>
                    {item.image && <img className="case-page-img" src={item.image} alt={item.title} />}
                    <div className="case-description">{item.description}</div>
                    <p>Created at: {new Date(item.date_created).toLocaleString()}</p>
                    <p>Status: {item.is_open ? "Open" : "Closed"}</p>

                    {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}

                    <div className="case-actions">
                        {isOwner && (
                            <>
                                <Link to={`/case/${id}/edit`}>
                                    <button>Edit Case</button>
                                </Link>
                                <button 
                                    onClick={handleDeleteClick} 
                                    disabled={isDeleting}
                                    style={{ backgroundColor: "#B23A48", color: "white" }}
                                >
                                    {isDeleting ? "Deleting..." : "Delete Case"}
                                </button>
                            </>
                        )}
                        <ShareButtons caseTitle={item.title} caseId={item.id} />
                    </div>

                    <ConfirmModal
                        isOpen={showDeleteModal}
                        title="Delete Case"
                        message="Are you sure you want to delete this case? This action cannot be undone and all associated data will be permanently removed."
                        confirmText="Delete Case"
                        cancelText="Cancel"
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                        isDangerous={true}
                    />

                    <ul className="historical-judgements">
                        {loadingJ ? (
                            <li>Loading judgements...</li>
                        ) : judgements.length === 0 ? (
                            <li>No judgements yet.</li>
                        ) : (
                            judgements.map((j) => (
                                <li key={j.id}>
                                    Verdict: {j.verdict ? "Guilty" : "Not Guilty"} —{" "}
                                    {j.anonymous ? "(Anonymous)" : `Supporter ${j.supporter}`}
                                    <br />
                                    Comment: {j.comment}
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="judgment-form">
                    <div className="judgment-summary">
                        <JudgementCount judgements={judgements} />
                    </div>
                    <JudgementForm
                        caseId={item.id}
                        onVoteSubmitted={() => {
                            window.location.reload();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CasePage;