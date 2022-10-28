const baseURL = "https://jsonplaceholder.typicode.com";

const register = (user) => {
  return fetch (`${baseURL}/users?username=${user.username}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Register failed");
      }
    })
    .then((data) => {
      if (data.length) {
        throw new Error("Username already exists");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
    });
};

const login = (username, password) => {
  return fetch (`${baseURL}/users?username=${username}&address.street=${password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      if (data.length) {
        localStorage.setItem("user", JSON.stringify(data[0]));

        // setup  user headline;
        const name = "Headline_" + data[0].id;
        const Headline = localStorage.getItem(name);
        if (Headline === null) {
          localStorage.setItem(name, data[0].company.catchPhrase);
        }
        // const Headlines = localStorage.getItem("Headlines");
        // if (!Headlines) {
        //   localStorage.setItem("Headlines", JSON.stringify([{userid: data[0].id, headline: data[0].company.catchPhrase}]));
        // }else{
        //   let Headlines = JSON.parse(localStorage.Headlines);
        //   let found = false;
        //   for (let i = 0; i < Headlines.length; i++){
        //     if (Headlines[i].userid === data[0].id){
        //       found = true;
        //       break;
        //     }
        //   }
        //   if (!found){
        //     Headlines.push({userid: data[0].id, headline: data[0].company.catchPhrase});
        //     localStorage.setItem("Headlines", JSON.stringify(Headlines));
        //   }
        // }
      return data;
    };
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};

