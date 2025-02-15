import React from 'react';

const PostPreview = ({ title, content }) => {
  // Truncate content to first 100 characters and add ellipsis if needed
  const truncatedContent = content.length > 100 
    ? content.substring(0, 100) + '...'
    : content;

  return (
    <div className="post-preview">
      <h2 className="post-title">{title}</h2>
      <p className="post-excerpt">{truncatedContent}</p>
    </div>
  );
};

export default PostPreview; 