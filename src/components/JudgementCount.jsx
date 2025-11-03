export default function JudgementCount({ judgements }) {
    const guilty = judgements.filter((j) => j.verdict === true).length;
    console.log (judgements)
    const notGuilty = judgements.filter((j) => j.verdict === false).length;

    return (
        <div>
            <p><strong>Guilty:</strong> {guilty}</p>
            <p><strong>Innocent:</strong> {notGuilty}</p>
        </div>
    );
}