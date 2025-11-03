import useCases from "../hooks/use-cases";
import CaseCard from "../components/CaseCard";

function HomePage() {
    const { cases } = useCases();
return (
    <div id='case-list'>
        {cases.map((caseData, key) => {
            return <CaseCard key={key} caseData={caseData} />;
        })}
    </div>


);
}
export default HomePage;