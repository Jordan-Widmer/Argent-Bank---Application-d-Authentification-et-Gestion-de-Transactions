import React from "react";
import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";

const featuresData = [
    {
        title: "You are our #1 priority",
        content: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
        imgSrc: iconChat,
        imgAlt: "Chat Icon"
    },
    {
        title: "More savings means higher rates",
        content: "The more you save with us, the higher your interest rate will be!",
        imgSrc: iconMoney,
        imgAlt: "Money Icon"
    },
    {
        title: "Security you can trust",
        content: "We use top of the line encryption to make sure your data and money is always safe.",
        imgSrc: iconSecurity,
        imgAlt: "Security Icon"
    }
];

function FeatureItem({title, content, imgSrc, imgAlt}) {
    return (
        <div className="feature-item">
            <img src={imgSrc} alt={imgAlt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{content}</p>
        </div>
    );
}

function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
            ))}
        </section>
    );
}

export default Features;
