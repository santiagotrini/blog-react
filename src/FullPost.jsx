import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchComments } from './helpers.js';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

const FullPost = props => {
  const { admin } = props;
  const { id } = useParams();
  const post = fetchPost(id);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let comments = fetchComments(id);
    setComments(comments);
  }, []);

  const [ formData, setFormData ] = useState({
    author: '',
    text: ''
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newComment = formData;
    console.log(comments.length);
    if (comments.length === 0) newComment.id = 1;
    else newComment.id = comments[0].id + 1;
    const newComments = [newComment, ...comments];
    setComments(newComments);
    localStorage.setItem(`comments/${id}`, JSON.stringify(newComments));
    setFormData({
      author: '',
      text: ''
    });
  };

  const { title, author, content } = post;

  return (
    <div className="post-page">
      <p className="post-author">Escrito por {author}</p>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      <hr />
      <form onSubmit={handleSubmit} className="comment-form">
        <h2>Comentarios</h2>
        <input 
          type="text"
          name="author" 
          value={formData.author}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <textarea 
          onChange={handleChange}
          value={formData.text}
          name="text" 
          cols="30" 
          rows="10"
          placeholder="Deja tu comentario"
        >
        </textarea>
        <button type="submit">Enviar</button>
      </form>
      <div className="comments">
        {comments.map((comment,idx) => <Comment admin={admin} key={idx}  comments={comments} setComments={setComments} comment={comment} postId={id} />)}
      </div>
    </div>
    
  );
};

export default FullPost;

const Comment = props => {
  const { admin, comment, postId, comments, setComments } = props;
  const { text, author, id } = comment;

  const handleDelete = () => {
    let newComments = comments.filter(c => c.id != id);
    localStorage.setItem(`comments/${postId}`, JSON.stringify(newComments));
    setComments(newComments);
  };
  // no hice el edit de comentarios
  return (
    <div>
      <h3>{author} dice:</h3>
      <p>{text}</p>
      {admin && <div className="controls">
        <button onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
        <button><i className="fa-solid fa-pencil"></i></button>
      </div>}
    </div>
  )
};