import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import postJudgement from "../api/post-judgement";


export default function JudgementForm({ caseId, caseOwnerId, onVoteSubmitted }) {
    const { auth } = useAuth();
    const token = window.localStorage.getItem("token");
    
    // Check if current user is the case owner
    const isOwner = auth?.userId && caseOwnerId && parseInt(auth.userId) === parseInt(caseOwnerId);
    
    if (!token) {
        return <p>Please log in to submit a verdict.</p>;
    }

    if (isOwner) {
        return (
            <div style={{ padding: "1rem", backgroundColor: "#fff3cd", borderRadius: "8px", border: "1px solid #ffc107" }}>
                <p style={{ color: "#856404", margin: 0 }}>
                    You cannot submit a verdict on your own case. Only other users can vote on cases you've created.
                </p>
            </div>
        );
    }
    
    const [verdict, setVerdict] = useState("");
    const [comment, setComment] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (verdict === "") {
            setError("Please select a verdict.");
            return;
        }
        
        if (comment.trim().length > 500) {
            setError("Comment must be 500 characters or less.");
            return;
        }
        
        setLoading(true);
        setError("");

        try {
            await postJudgement({
                caseId,
                verdict: verdict === "true",
                comment,
                anonymous,
                token,
            });
            setVerdict("");
            setComment("");
            setAnonymous(false);
            onVoteSubmitted?.();
        } catch (err) {
            const message = err.message || "Failed to submit verdict. Please try again.";
            setError(message);
            console.error("Judgement submission error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Submit Your Verdict</h3>
            <fieldset>
                <legend>Verdict</legend>
                <label>
                    <input
                        type="radio"
                        name="verdict"
                        value="true"
                        checked={verdict === "true"}
                        onChange={(e) => setVerdict(e.target.value)}
                        aria-required="true"
                    />
                    Guilty
                </label>
                <label>
                    <input
                        type="radio"
                        name="verdict"
                        value="false"
                        checked={verdict === "false"}
                        onChange={(e) => setVerdict(e.target.value)}
                        aria-required="true"
                    />
                    Not Guilty
                </label>
            </fieldset>
            <div>
                <input
                    type="text"
                    placeholder="Explain your reasoning..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength="500"
                />
                <small>{comment.length}/500 characters</small>
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                />
                Submit anonymously
            </label>
            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}