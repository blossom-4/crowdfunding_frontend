import "./JudgementCount.css";

export default function JudgementCount({ judgements }) {
    const guilty = judgements.filter((j) => j.verdict === true).length;
    const notGuilty = judgements.filter((j) => j.verdict === false).length;
    const total = guilty + notGuilty;

    // Calculate percentages
    const guiltyPercent = total > 0 ? Math.round((guilty / total) * 100) : 0;
    const notGuiltyPercent = total > 0 ? Math.round((notGuilty / total) * 100) : 0;

    return (
        <div className="judgement-count">
            <div className="judgement-bar">
                {guilty > 0 && (
                    <div
                        className="judgement-bar-guilty"
                        style={{ width: `${guiltyPercent}%` }}
                        aria-label={`${guilty} guilty verdicts`}
                    />
                )}
                {notGuilty > 0 && (
                    <div
                        className="judgement-bar-innocent"
                        style={{ width: `${notGuiltyPercent}%` }}
                        aria-label={`${notGuilty} innocent verdicts`}
                    />
                )}
                {total === 0 && (
                    <div className="judgement-bar-empty">No verdicts yet</div>
                )}
            </div>
            <div className="judgement-labels">
                <div className="judgement-label">
                    <span className="judgement-label-color guilty"></span>
                    <span className="judgement-label-text">Guilty: {guilty} ({guiltyPercent}%)</span>
                </div>
                <div className="judgement-label">
                    <span className="judgement-label-color innocent"></span>
                    <span className="judgement-label-text">Innocent: {notGuilty} ({notGuiltyPercent}%)</span>
                </div>
            </div>
        </div>
    );
}