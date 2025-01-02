import React from 'react';
import Header from './header';
import Footer from './footer';
// import './Notebook.css';

// Mock article data (replace with actual API or database later)
const articles = [
  {
    title: 'Project Name',
    description: 'A brief intro 2 to 3 lines with a link to the article.',
    link: '#article1',
  },
  {
    title: 'Title',
    description: 'Another brief intro 2 to 3 lines with a link to the article.',
    link: '#article2',
  },
];

function Notebook() {
  return (
    <div className="aboutme-container">
      <Header />
      <main className="aboutme-main">
        <h1 className="aboutme-title">Notebook</h1>

        {/* Render articles dynamically */}
        {articles.map((article, index) => (
          <section key={index} className="aboutme-section">
            <h2 className="aboutme-section-title">{article.title}</h2>
            <p className="aboutme-placeholder">
              {article.description} <a href={article.link}>&lt;Link to Article&gt;</a>
            </p>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Notebook;



// const articles = [
//   { id: 1, title: 'First Article', date: '2024-12-01', hashtags: ['#React', '#AWS'] },
//   { id: 2, title: 'Second Article', date: '2024-12-02', hashtags: ['#JavaScript', '#Cloud'] },
// ];

// const Notebook = () => {
//   return (
//     <div className="notebook">
//       <h1>Notebook</h1>
//       <ul>
//         {articles.map((article) => (
//           <li key={article.id}>
//             <a href={`/article/${article.id}`}>{article.title}</a>
//             <span>{article.date}</span>
//             <div className="hashtags">
//               {article.hashtags.map((tag) => (
//                 <span key={tag}>{tag}</span>
//               ))}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notebook;
