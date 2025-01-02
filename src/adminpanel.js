import React, { useState } from 'react';
// import './AdminPanel.css';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('hashtags', hashtags);
    if (image) formData.append('image', image);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    alert('Article uploaded successfully!');
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="text" placeholder="Hashtags (comma-separated)" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdminPanel;
