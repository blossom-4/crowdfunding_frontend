import "./AboutPage.css";

export default function AboutPage() {
    return (
        <main className="about-page">

            <header>
                <h1>Raise the Case</h1>

                <p className="lead">
                    A community-driven justice platform where everyday people can review,
                    debate, and judge real cases.
                </p>
            </header>

            <section>
                <h2>Our Story</h2>

                <p>
                    Raise the Case was created to give a voice to those who feel unheard
                    by traditional justice systems. Our mission is to crowdsource public
                    insight, promote transparency, and bring attention to overlooked
                    stories.
                </p>

                <p>
                    Since launching, we've grown into a passionate community of
                    truth-seekers, investigators, and everyday citizens who believe
                    justice should be accessible to everyone.
                </p>
            </section>

            <footer className="footer">
                <p>
                    Raise the Case acknowledges the Traditional Owners of the land on
                    which we live, work, and gather. We pay our respects to Elders past
                    and present, and extend that respect to all Aboriginal and Torres
                    Strait Islander peoples. Colonisation was and is the single greatest
                    injustice to humankind, sovereignty has never been ceded.
                </p>

                <p>
                    © 2025 Raise the Case. All Rights Reserved.
                </p>
            </footer>

        </main>
    );
}
