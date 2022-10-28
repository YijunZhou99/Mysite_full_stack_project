import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import postActions from "../../Redux/actions/postActions";
import PostComponent from "./PostComponent";



export function PostBox() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [searchquery, setSearchquery] = useState("");
  const newpost_formRef = useRef(null);
  const search_formRef = useRef(null);
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [userid, setUserid] = useState(userObj.id);

  const  dispatch  = useDispatch();


  const newpost = localStorage.getItem("newpost");
  let newpost_length = 0;
  if (newpost) {
    newpost_length = JSON.parse(newpost).length;
  }

  const imgRef = useRef(null);

  const handleUploadImg =(e) => {
    e.preventDefault();
    imgRef.current.click();
  };

  const handleSubmitNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: newpost_length + 1 + 100,
      userId: userid,
      title: title,
      body: body,
    };
    dispatch(postActions.addPost(newPost));
    newpost_formRef.current.reset();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const search_by = document.getElementById("search by").value;
    dispatch(postActions.searchPost(search_by, searchquery));
    search_formRef.current.reset();
  };
 
  
  return (
    <div >
      <div className="border mb-3 rounded postbox">
        <form ref={newpost_formRef} className="form-inline w-100 p-3" onSubmit={handleSubmitNewPost}>
          <h3>Start your new post here!</h3>
          <input className="form-control bg-light border-0 d-block mb-1" type="text"
            placeholder="Title" id="new_post_title" 
            onChange={(e) => setTitle(e.target.value)}
            required/>
          <input className="form-control bg-light border-0  d-block mb-1" type="text"
            placeholder="Context" id="new_post_body" 
            onChange={(e) => setBody(e.target.value)}
            required/>
          <input ref={imgRef} type="file" 
            id="new_post_img" name="new_post_img" 
            style={{display:"none"}}
            onChange={(e) => setImage(e.target.value)}
          />
          <button className="btn btn-outline-dark mb-2 me-5" onClick={handleUploadImg}>
            <i className="upload icon"></i>
            Upload Image
            </button>
          <button type="submit" className="btn btn-outline-dark mb-2">Submit</button>
          <button type="reset" className="btn btn-outline-dark mb-2">Clear</button>
        </form>
      </div>
      
      <form ref={search_formRef} className="d-flex justify-content-between mb-3" onSubmit={handleSearch}>

        <select className="form-select w-25" name="dog-names" id="search by">
          <option value="by_author">By Author</option>
          <option value="by_body">By Body</option>
        </select>

        <input className="form-control mr-sm-2" type="text" placeholder="Search"
          id="search" name="search"
          onChange={(e) => setSearchquery(e.target.value)}          
        />
        <button className="btn btn-outline-primary my-2 my-sm-0 me-2" type="submit">
          <i className="search icon"></i>
        </button>
        <button className="btn btn-outline-dark my-2 my-sm-0 w-25"
          onClick={(e) => setSearchquery("")}>
          Show All
        </button>

      </form>
  
      <div>
      <PostComponent />
      </div> 
    </div>
  );

};