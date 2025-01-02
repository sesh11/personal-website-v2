import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutMe from './aboutme';
import Notebook from './notebook';
import Article from './article';
import AdminPanel from './adminpanel';
import Projectss from './projects';
import ReadingList from './readinglist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/projects" element={<Projectss />} />
        <Route path="/readinglist" element={<ReadingList />} />
      </Routes>
    </Router>
  );
}

export default App;

