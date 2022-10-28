import React, { useState, useRef } from "react";
import{ useSelector } from "react-redux";  
import Default_Post_Pic from "../../Pics/Picture1.png";
import avatars from "../../Pics/avatars";

const PostComponent = () => {
  const { posts } = useSelector((state) => state.postReducer);
  const { searchby, searchquery } = useSelector((state) => state.postReducer);
  const { allUsers } = useSelector((state) => state.followReducer);
  const {followings} = useSelector((state) => state.followReducer);
  const followingsId = followings.map((following) => following.id);
  const userid = JSON.parse(localStorage.getItem("user")).id;
  const postsOrderId = followingsId.concat(userid);
  const newpost = JSON.parse(localStorage.getItem("newpost"))||[];

  const orderedPosts = postsOrderId.map((id) => {
    return posts.filter((post) => post.userId === id);
  });

  let list = orderedPosts.flat();
  for (let i = 0; i < newpost.length; i++) {
    list = [newpost[i], ...list];
  }
  
  const postlist = list.filter((post) => {
    if (searchquery === "") {
      return post;
    } else if ( searchby ==="by_body" && post.body.toLowerCase().includes(searchquery.toLowerCase())
    ) {
      return post;
    } else if (searchby ==="by_author" && allUsers[post.userId - 1].username === searchquery) {
      return post;
    }
  });

  const handleComment = (e) => {
    e.preventDefault();
    const display_status = getComputedStyle(e.target.nextElementSibling.nextElementSibling).display;
    if (display_status === "none") {
      e.target.nextElementSibling.nextElementSibling.style.display = "block";
      e.target.innerHTML = "Hide Comments";
    } else {
      e.target.nextElementSibling.nextElementSibling.style.display = "none";
      e.target.innerHTML = "Show Comments";
    }
  };


  const postlist2 = postlist.map((post) => {
    const { id, title, body, userId } = post;
    return (
        <div className="card" key={id}>
        <div className="card-body">
          <div className="author mb-2">
            <img className="rounded-circle" src={avatars[userId]} 
              width="50" height="50">
            </img> 
            {userid?allUsers[userId - 1].username:JSON.parse(localStorage.getItem("user")).username}
          </div>
          <img src={Default_Post_Pic} width="250" height="100"></img>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <button className="btn btn-primary me-2" onClick={handleComment}>
            <i className="comments outline icon"></i>
            Show Comments
          </button>
          <button className="btn btn-primary">
            <i className="edit outline icon"></i>
            Edit
          </button>
          <div className="comments mt-2" style={{display:"none"}}> 
            <ul className="list-group">
              <li className="list-group-item">Comment 1</li>
              <li className="list-group-item">Comment 2</li>
              <li className="list-group-item">Comment 3</li>
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return <div className="posts" >{postlist2}</div>;
};




export default PostComponent;
