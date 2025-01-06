import React from 'react';
import Header from './header';
import Footer from './footer';
// import './Notebook.css';

function ReadingList() {
    return (
    <div className="aboutme-container">
        <Header />
        <main className="aboutme-main">
            <h1 className="aboutme-title">Reading List</h1>
        </main>
        <Footer />
    </div>
    );
}

export default ReadingList;