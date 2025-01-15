import React, { useState, useEffect} from 'react';
import './aboutme.css'; // <-- Import the AboutMe.css file here
import Header from './header'; // <-- Import the header component here
import Footer from './footer'; // <-- Import the footer component here
import DynamicContent from './DynamicComponent';
 

function AboutMe() {

  const [name, setName] = useState(''); // State to store progressively displayed name
  const fullName = "Nithin Seshadri";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullName.length) {
        // setName(prev => prev + fullName.charAt(index));
        setName(fullName.slice(0, index));
        // setName((prev) => prev + fullName.charAt(index);
        index++;
      } else {
        clearInterval(interval); // Stop the interval when the full name is displayed
      }
    }, 200); // Adjust the speed here (200ms per letter)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="aboutme-container">
      {/* Header */} 
      <Header />

      {/* Page Title */}
      {/* <h1 className="aboutme-title">{name}</h1> // uncomment for effect */}
      <hi className="aboutme-title">Nithin Seshadri</hi>

      {/* Main Content */}
      <main className="aboutme-main">
        {/* Bio Section */}
        <section className="aboutme-section">
          <h2 className="aboutme-section-title">ABOUT ME</h2>
          <DynamicContent
            bucketPath="about/bio.md"
            contentType="markdown"
          />  
        </section>

        <section className="aboutme-section">
          <h2 className="aboutme-section-title">PROFESSIONAL</h2>
          <DynamicContent
            bucketPath="about/professional.md"
            contentType="markdown"
          />  
        </section>
        
        <section className="aboutme-section">
          <h2 className="aboutme-section-title">PERSONAL</h2>
          <DynamicContent
            bucketPath="about/personal.md"
            contentType="markdown"
          />  
        </section>


        {/* Bottom Links */}
        <Footer />
      </main>
    </div>
  );
}

export default AboutMe;


