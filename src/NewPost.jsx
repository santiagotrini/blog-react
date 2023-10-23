import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = props => {
  
  const { addPost } = props;
  const navigate = useNavigate();
  

  const [ formData, setFormData ] = useState({
    title: '',
    author: '',
    content: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      title: '',
      author: '',
      content: ''
    });  
    navigate('/');
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]: value });
  };
  
  return (
    <>
      <form className="new-post" onSubmit={handleSubmit}>
        <h2>Nuevo post</h2>
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

export default NewPost;