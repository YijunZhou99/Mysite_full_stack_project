const baseURL = "https://jsonplaceholder.typicode.com";

const setNewPost = (post) => {
  let newpost = JSON.parse(localStorage.getItem("newpost"));
  if (newpost) {
    newpost = [...newpost, post];
  } else {
    newpost = [post];
  }
  localStorage.setItem("newpost", JSON.stringify(newpost));
}
const getAllPosts = () => {
  return fetch(`${baseURL}/posts`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("postList", JSON.stringify(data));
      return data;
    });
};

const clearPosts = () => {
  localStorage.removeItem("postList");
  localStorage.removeItem("newpost");
};

export default {
  setNewPost,
  getAllPosts,
  clearPosts
};