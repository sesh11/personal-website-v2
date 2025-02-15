import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const DynamicContent = ({ bucketPath, contentType, render }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/content?path=${bucketPath}&type=${contentType}`);
        if (!response.ok) throw new Error('Content fetch failed');
        const data = await response.json();
        setContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [bucketPath, contentType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded">
        Error loading content: {error}
      </div>
    );
  }

  // If a render prop is provided, use it for custom rendering
  if (render) {
    return render(content);
  }

  // Default rendering
  return (
    <div className="prose max-w-none">
      {contentType === 'markdown' ? (
        <ReactMarkdown>{content}</ReactMarkdown>
      ) : (
        <pre>{content}</pre>
      )}
    </div>
  );
};

export default DynamicContent;