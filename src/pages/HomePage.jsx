import useCases from "../hooks/use-cases";
import CaseCard from "../components/CaseCard";
import "./HomePage.css";

function HomePage() {
    const { cases } = useCases();
    return (
        <div className="home-page">
            <section className="home-header">
                <p className="home-quote">Real people. Real cases.  
                </p>
                <p className="home-quote">Justice decided by you, in the court of public opinion.</p>
            </section>

            <div id='case-list'>
                {cases.map((caseData, key) => {
                    return <CaseCard key={key} caseData={caseData} />;
                })}
            </div>
        </div>
    );
}
export default HomePage;