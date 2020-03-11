import axios from '../axios';

export const signup = (user,next) => {
  axios.post('/addUser',{
    email : user.email,
    password : user.password,
    name : user.name
  },{
    headers : {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    next(res.data);
  })
  .catch(err => {
    next(err.response.data);
  });
};

export const signin = (user,next) => {
  axios.post('/login',{
    email : user.email,
    password : user.password
  },{
    headers : {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    next(response.data);
  })
  .catch(error => {
    next(error.response.data);
  });
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  next();
  axios.get('/logout')
  .then((response) => response.data)
  .catch(err => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
