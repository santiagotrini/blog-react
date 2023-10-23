export const fetchPosts = () => {
  let posts = JSON.parse(localStorage.getItem('posts'));
  if (posts)
    return posts;
  else
    return [];  
};

export const fetchPost = id => {
  let posts = JSON.parse(localStorage.getItem('posts'));
  if (posts) {
    let post = posts.filter(post => post.id == id);
    return post[0];
  } else {
    return {};
  }
};

export const fetchComments = id => {
  let comments = JSON.parse(localStorage.getItem(`comments/${id}`));
  if (comments)
    return comments;
  else
    return [];
};