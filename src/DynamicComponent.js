import React, { useState, useEffect } from 'react';

const DynamicContent = ({ bucketPath, contentType }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content?path=${bucketPath}&type=${contentType}`);
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

  return (
    <div className="prose max-w-none">
      {contentType === 'markdown' ? (
        <div dangerouslySetInnerHTML={{ __html: content.htmlContent }} />
      ) : (
        <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
          {JSON.stringify(content, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default DynamicContent;