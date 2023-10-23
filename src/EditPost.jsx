// imports
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from './helpers.js';

const EditPost = props => {

  // props
  const { updatePost } = props;
  
  // hooks
  const navigate = useNavigate();
  const { id } = useParams();
  
  // fetch post data
  const post = fetchPost(id);
  
  // state
  const [ formData, setFormData ] = useState({
    id: +id,
    title: post.title,
    author: post.author,
    content: post.content
  });
  
  // event handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updatePost(formData);
    setFormData({
      title: '',
      author: '',
      content: ''
    });  
    navigate('/');
  };
  
  // render
  return (
    <>
      <form className="new-post" onSubmit={handleSubmit}>
        <h2>Editar post</h2>
        <input
          onChange={handleChange} 
          type="text" 
          name="title"
          value={formData.title} 
          placeholder="titulo" 
        />
        <input 
          onChange={handleChange}
          type="text" 
          name="author"
          value={formData.author} 
          placeholder="autor" 
        />
        <textarea
          onChange={handleChange} 
          name="content" 
          value={formData.content} 
          cols="30" 
          rows="10"
          spellCheck="false"
          placeholder="Escribi tu post aca..."
        >
        </textarea>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default EditPost;