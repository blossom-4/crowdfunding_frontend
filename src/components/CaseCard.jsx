import { Link } from "react-router-dom";
import "./CaseCard.css";

function CaseCard(props) {
    const { caseData } = props;
    const caseLink = `case/${caseData.id}`;

return (
    <div className="case-card">
    <Link to={caseLink}>
        <img src={caseData.image} />
        <h3>{caseData.title}</h3>
    </Link>
    </div>
);
}

export default CaseCard;