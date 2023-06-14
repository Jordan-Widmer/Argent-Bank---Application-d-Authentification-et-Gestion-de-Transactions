import React from 'react';
import iconChat from '../assets/img/icon-chat.png';
import iconMoney from '../assets/img/icon-money.png';
import iconSecurity from '../assets/img/icon-security.png';

function FeatureItem({ title, children, imgSrc, imgAlt }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem imgSrc={iconChat} imgAlt="Chat Icon" title="You are our #1 priority">
        Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
      </FeatureItem>
      <FeatureItem imgSrc={iconMoney} imgAlt="Money Icon" title="More savings means higher rates">
        The more you save with us, the higher your interest rate will be!
      </FeatureItem>
      <FeatureItem imgSrc={iconSecurity} imgAlt="Security Icon" title="Security you can trust">
        We use top of the line encryption to make sure your data and money is always safe.
      </FeatureItem>
    </section>
  );
}

export default Features;
