import React from "react";

const subtitles = ["No fees.", "No minimum deposit.", "High interest rates."];
const text = "Open a savings account with Argent Bank today!";

function Hero() {
    return (
        <div className="hero">
            <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                {subtitles.map((subtitle, index) => (
                    <p className="subtitle" key={index}>
                        {subtitle}
                    </p>
                ))}
                <p className="text">{text}</p>
            </section>
        </div>
    );
}

export default Hero;
