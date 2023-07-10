import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

function HomePage() {
    return (
        <div>
            <NavBar />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
}

export default HomePage;
