import React from 'react';
import './aboutme.css'; // Reuse the same styles for the footer

function Footer() {
  return (
    <div className="aboutme-links">
      <div className="aboutme-link-row">
        <span className="aboutme-platform">X</span>
        <a href="https://x.com/seshadrinithin">&lt;Link&gt;</a>
      </div>
      <div className="aboutme-link-row">
        <span className="aboutme-platform">LINKEDIN</span>
        <a href="https://www.linkedin.com/in/nithin-seshadri-b5703766/">&lt;link&gt;</a>
      </div>
    </div>
  );
}

export default Footer;
