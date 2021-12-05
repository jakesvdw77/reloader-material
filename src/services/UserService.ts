import User from "../models/User";

async function loginUser(email: string, password: string) {
  const data = {
    userName: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let url = `${process.env.REACT_APP_API_HOST}/login`;

  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((d) => {
      if (d.errors) {
        throw new Error(d.errors[0]);
      }

      return d.data;
    });
}

async function getProfile(access_token: string) {
  let url = `${process.env.REACT_APP_API_HOST}/profile`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  };

  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((d) => {
      if (d.errors) {
        throw new Error(d.errors[0]);
      }

    
      return d.data;
    });
}

async function createUser(user: User) {
  console.log(JSON.stringify(user));

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  let url = `${process.env.REACT_APP_API_HOST}/register`;

  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((d) => {
      if (d.errors) {
        console.log("Error Found .... " + d.errors[0]);
        throw new Error(d.errors[0]);
      }
      return d.data;
    });
}

export { loginUser, createUser, getProfile };
