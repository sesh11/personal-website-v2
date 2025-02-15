import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import DynamicContent from './DynamicComponent';
import PostPreview from './PostPreview';
import './aboutme.css';

function Notebook() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch the list of posts from the posts directory
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/list-content?path=posts`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data.files || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="aboutme-container">
      <Header />
      <main className="aboutme-main">
        <h1 className="aboutme-title">POSTS</h1>
        
        {loading && (
          <div className="loading">Loading posts...</div>
        )}
        
        {error && (
          <div className="error">Error loading posts: {error}</div>
        )}
        
        <div className="posts-container">
          {posts.map((post, index) => (
            <div key={index} className="post-item">
              <DynamicContent
                bucketPath={`posts/${post}`}
                contentType="markdown"
                render={(content) => (
                  <PostPreview
                    title={post.replace('.md', '')}
                    content={content}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Notebook;
