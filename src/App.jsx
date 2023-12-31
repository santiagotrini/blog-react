// imports
import { useState, useEffect } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import { fetchPosts } from './helpers.js';
import MainPage from './MainPage.jsx';
import AdminPrompt from './AdminPrompt.jsx';
import NewPost from './NewPost.jsx';
import FullPost from './FullPost.jsx';
import EditPost from './EditPost.jsx';
import Nav from './Nav.jsx';

const App = () => {

  // state hook
  const [admin, setAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  
  // fetch posts from localStorage
  useEffect(() => {
    let posts = fetchPosts();
    setPosts(posts);
  }, []);

  // altas, bajas y modificaciones  
  const deletePost = id => {
    const newPosts = posts.filter(p => p.id != id);
    setPosts(newPosts);
    localStorage.removeItem(`comments/${id}`);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const updatePost = post => {
    const newPosts = posts.map(p => p.id === post.id ? post : p);
    console.log(newPosts);
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const addPost = post => {
    const newPost = { id: posts.length+1, ...post};
    const newPosts = [...posts, newPost];
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  // render  
  return (
    <>
    <Nav admin={admin} />
    <Routes>
      <Route path="/" element={<MainPage deletePost={deletePost} admin={admin} posts={posts} />} />
      <Route path="/new" element={<NewPost addPost={addPost} />} />
      <Route path="/posts/:id" element={<FullPost admin={admin} />} />
      <Route path="/edit/:id" element={<EditPost updatePost={updatePost} />} />
      <Route path="/admin" element={<AdminPrompt setAdmin={setAdmin} />} />
    </Routes>
    </>
  );
};

export default App
