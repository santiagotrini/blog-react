import Post from './Post.jsx';
// Main Page component
const MainPage = props => {
  
  const { posts, admin, deletePost } = props;

  return (
    <>
      <div className="Posts">
        {posts.length === 0 ? <h2 className="no-posts">Aun no hay posts</h2> : null}
        {posts.map(post => (
          <Post
            deletePost={deletePost}
            admin={admin} 
            key={post.id} 
            id={post.id}
            title={post.title}
            author={post.author}
            content={post.content}
          />
        ))}
      </div>
    </>
  );
};

export default MainPage;