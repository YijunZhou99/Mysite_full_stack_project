import React from "react";
import{ useSelector } from "react-redux"; 
import avatars from "../../Pics/avatars";
import followActions from "../../Redux/actions/followActions";
import { useDispatch } from "react-redux";

const FollowComponent = () => {
  const { allUsers } = useSelector((state) => state.followReducer);
  const dispatch = useDispatch();

  const {followings} = useSelector((state) => state.followReducer);

  const handleDelete = (e) => {
    e.preventDefault();
    const userid = e.target.name;
    dispatch(followActions.deleteFollowing(userid));
  }
  
  const followlist = followings.map((user) => {
    const { id, name, username, email } = user;
    return (
      <div className="card" key={id}>
        <div className="card-body d-flex justify-content-between">
          <img className="w-25" src={avatars[id%10]} ></img>
          <div className="following_card_text">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">username: {username}</p>
          </div>
          <button className="btn btn-outline-primary me-2" name={id} onClick={handleDelete}>
            <i className="user delete icon"></i><br/>
            Unfollow
            </button>
        </div>
      </div>
    );
  }
  );

  return <div className="follows" >{followlist}</div>;

};



export default FollowComponent;

