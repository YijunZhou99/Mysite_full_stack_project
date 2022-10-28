const baseURL = "https://jsonplaceholder.typicode.com";

const getAllUsers = () => {
  return fetch (`${baseURL}/users`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Get users failed");
      }
    })
    .then((data) => {
      localStorage.setItem("allUsers", JSON.stringify(data));
      return data;
    });
};

const getFollowings = (user) => {
  return fetch (`${baseURL}/users`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Get users failed");
      }
    })
    .then((data) => {
      const userid = JSON.parse(user).id;
      if (userid === 0){
        localStorage.setItem("followings", JSON.stringify([]));
        return [];
      }
      else{
      const userFollowingIds = [(userid+1)%10, (userid+2)%10, (userid+3)%10];
      const followlist = data.filter((user) => {
        if (userFollowingIds.includes(user.id)) {
          return user;
        }
        });
      localStorage.setItem("followings", JSON.stringify(followlist));
      return followlist;
    }

    });
};

const addFollowing = (username) => {
  return fetch (`${baseURL}/users?username=${username}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Add Non-register User Failed");
      }
    })
    .then((data) => {
      if (data.length === 0) {
        throw new Error("Add Non-register User Failed");
      } else {
        const followings = JSON.parse(localStorage.getItem("followings"));
        if (followings.some((item) => item.id === data[0].id)) {
          throw new Error("Add Existing User Failed");
        } else if (data[0].id === JSON.parse(localStorage.getItem("user")).id) {
          throw new Error("Add Self User Failed");
        }else {
        let followings = JSON.parse(localStorage.getItem("followings"));
        followings.push(data[0]);
        localStorage.setItem("followings", JSON.stringify(followings));
        return data[0];
        }
      }
    });
};

const deleteFollowing = (userid) => {
  let followings = JSON.parse(localStorage.getItem("followings"));
  let newfollowings = followings.filter((user) =>{
    if (user.id !== parseInt(userid)) {
      return user;
    }else{
      return null;
    }
  });
  localStorage.setItem("followings", JSON.stringify(newfollowings));
  return newfollowings;
};


const clearFollowings = () => {
  localStorage.removeItem("allUsers");
  localStorage.removeItem("followings");
};

export default {
  getAllUsers,
  getFollowings,
  deleteFollowing,
  clearFollowings,
  addFollowing,
};

