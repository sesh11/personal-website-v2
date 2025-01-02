import React, { useState, useEffect} from 'react';
import './aboutme.css'; // <-- Import the AboutMe.css file here
import Header from './header'; // <-- Import the header component here
import Footer from './footer'; // <-- Import the footer component here
// import roshiimage from './assets/roshit_kamehameha.jpeg';
 

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
      {/* <header className="aboutme-header">
        <div className="aboutme-brand">Nithin Seshadri</div>
        <nav className="aboutme-nav">
          <a href="#readinglist">Reading List</a>
          <a href="#projects">Projects</a>
          <a href="#notebook">Notebook</a>
          <a href="#myprofile">My profile</a>
        </nav>
      </header> */}

      {/* Page Title */}
      {/* <h1 className="aboutme-title">{name}</h1> // uncomment for effect */}
      <hi className="aboutme-title">Nithin Seshadri</hi>

      {/* Main Content */}
      <main className="aboutme-main">
        {/* Image */}
        {/* <div className="aboutme-image-container">
          <img 
            src="/roshi_kamehameha.jpeg"
            alt="Green leaves"
            className="aboutme-image"
          />
        </div> */}
      <p className="aboutme-quote"><em>"Work hard, study well, and eat and sleep plenty. That is the Turtle Hermit Way! We must master the art of peace in addition to the art of war." - Master Roshi</em></p>

        {/* Bio Section */}
        <section className="aboutme-section">
          {/* <h2 className="aboutme-section-title">Bio</h2> */}
          <p className="aboutme-placeholder">&lt;Insert&gt;</p>
        </section>

        {/* Work Experience Section */}
        <section className="aboutme-section">
          {/* <h2 className="aboutme-section-title">Work Experience</h2> */}
          <p className="aboutme-placeholder">&lt;Insert&gt;</p>
        </section>

        {/* Education Section */}
        <section className="aboutme-section">
          {/* <h2 className="aboutme-section-title">Education</h2> */}
          <p className="aboutme-placeholder">&lt;Insert&gt;</p>
        </section>

        {/* Bottom Links */}
        <Footer />
        {/* <div className="aboutme-links">
          <div className="aboutme-link-row">
            <span className="aboutme-platform">X PLATFORM</span>
            <a href="#xlink">&lt;Link&gt;</a>
          </div>
          <div className="aboutme-link-row">
            <span className="aboutme-platform">LINKEDIN</span>
            <a href="#linkedin">&lt;Link&gt;</a>
          </div>
        </div> */}
      </main>
    </div>
  );
}

export default AboutMe;



// import React from 'react';
// import './App.css';

// const AboutMe = () => {
//   return (
//     <div className="container">
//       <nav className="navigation">
//         <h1 className="name">Nithin Seshadri</h1>
//         <ul>
//           <li><a href="/">Home</a></li>
//           <li><a href="/notebook">Notebook</a></li>
//         </ul>
//       </nav>
//       <div className="content">
//         <header className="header">
//           <h2>Welcome to My Website</h2>
//         </header>
//         <section className="about-section">
//           <div className="about-content">
//             <img src="/path/to/your-picture.jpg" alt="Nithin Seshadri" className="profile-pic" />
//             <p className="about-description">
//               Hello! I am Nithin Seshadri, a passionate developer and lifelong learner with expertise in building scalable web applications. This website serves as a platform to share my thoughts, projects, and learnings.
//             </p>
//           </div>
//         </section>
//         <footer className="footer">
//           <div className="social-links">
//             <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
//             <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default AboutMe;



// import React from 'react';
// import './App.css';

// const AboutMe = () => {
//   return (
//     <div className="container">
//       <div className="layout">
//         <nav className="navigation">
//           <h1 className="name">Nithin Seshadri</h1>
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/notebook">Notebook</a></li>
//           </ul>
//         </nav>
//         <div className="main-content">
//           <header className="header">
//             <h2>Welcome to My Website</h2>
//           </header>
//           <section className="about-section">
//             <div className="about-content">
//               <img src="/path/to/your-picture.jpg" alt="Nithin Seshadri" className="profile-pic" />
//               <p className="about-description">
//                 Hello! I am Nithin Seshadri, a passionate developer and lifelong learner with expertise in building scalable web applications. This website serves as a platform to share my thoughts, projects, and learnings.
//               </p>
//             </div>
//           </section>
//           <footer className="footer">
//             <div className="social-links">
//               <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
//               <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutMe;

