import { useParams, Link } from "react-router-dom";
import useCase from "../hooks/use-case.js";
import useJudgements from "../hooks/use-judgements.js";
import JudgementForm from "../components/JudgementForm.jsx";
import JudgementCount from "../components/JudgementCount.jsx";
import "./CasePage.css";

function CasePage() {
    const { id } = useParams();
    const { item, isLoading, error } = useCase(id);
    const { judgements, isLoading: loadingJ, error: errorJ } = useJudgements(id);

    if (isLoading) return <p>Loading case...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Count judgements
    const guiltyCount = judgements.filter(j => j.verdict).length;
    const notGuiltyCount = judgements.filter(j => !j.verdict).length;

    return (
        <div className="container">

            {/* Judgement summary at top */}
            <div className="judgment-summary">
                <JudgementCount judgements={judgements} />
            </div>

            {/* Case content + judgement form */}
            <div className="case-judgment-container">

                {/* Left column: Case content */}
                <div className="case-content">
                    <h2>{item.title}</h2>
                    {item.image && <img className="case-page-img" src={item.image} alt={item.title} />}
                    <p>{item.description}</p>
                    <p>Created at: {new Date(item.date_created).toLocaleString()}</p>
                    <p>Status: {item.is_open ? "Open" : "Closed"}</p>

                    {errorJ && <p style={{ color: "red" }}>{errorJ.message}</p>}

                    {/* Only show Edit Case button for owner */}
                    <Link to={`/case/${id}/edit`}>
                        <button>Edit Case</button>
                    </Link>

                    {/* Historical Judgements */}
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

                {/* Right column: Judgement form */}
                <div className="judgment-form">
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