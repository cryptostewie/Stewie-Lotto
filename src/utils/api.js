import request from "./request";
import * as URL from "./url";

const login = (email, password) => {
  const data = {
    email: email,
    password: password,
  };

  return request(URL.BASE, {
    url: URL.LOGIN,
    method: "POST",
    data,
  });
};

const register = (name, email, password) => {
  const data = {
    name: name,
    email: email,
    password: password,
  };

  return request(URL.BASE, {
    url: URL.REGISTER,
    method: "POST",
    data,
  });
};

const getUserInfo = (auth_token) => {
  return request(URL.BASE, {
    url: URL.GET_USER_INFO,
    method: "POST",
    headers:{
      Authorization: `RLSITE ${auth_token}`
    }
  });
};

const getSecret = (auth_token) => {
  return request(URL.BASE, {
    url: URL.GET_SECRET,
    method: "GET",
    headers:{
      Authorization: `Bearer ${auth_token}`
    }
  });
};


export { login, register, getUserInfo, getSecret};
