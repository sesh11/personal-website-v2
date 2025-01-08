import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const DynamicContent = ({ bucketPath, contentType }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('ENV:', process.env.REACT_APP_API_ENDPOINT);
        console.log('Path & Type:', bucketPath, contentType);
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/content?path=${bucketPath}&type=${contentType}`);
        console.log('Response:', response);
        if (!response.ok) throw new Error('Content fetch failed');
        const data = await response.json();
        console.log('Data:', data);
        setContent(data);
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