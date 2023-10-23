import { Link, useNavigate } from 'react-router-dom'; 
const Post = props => {
  const { id, title, author, admin, deletePost } = props;
  const navigate = useNavigate();
  const handleDelete = () => {
    deletePost(id);
  };
  const handleEdit = () => {
    navigate(`/edit/${id}`)
  }
  return (
    <div className="post">
      <p style={{marginBottom: '5px'}} className="post-author">Por {author}</p>
      <Link to={`/posts/${id}`}>
        <h2 style={{marginTop: '5px'}}>
          {title} 
        </h2>
      </Link>
      { admin && <>
        <button onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
        <button onClick={handleEdit}><i className="fa-solid fa-pencil"></i></button>
        </>
      }
    </div>
  );
};

export default Post;