import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './Article.css';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch article data based on ID (replace with actual backend call)
    const fetchArticle = async () => {
      const response = await fetch(`/api/articles/${id}`);
      const data = await response.json();
      setArticle(data);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="article">
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </div>
  );
};

export default Article;
