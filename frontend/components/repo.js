import { REACT_APP_API_URL } from '@env';

const API_URL = REACT_APP_API_URL;


const checkResponse = (res) => {
  const { status } = res;
  
  if (res.ok) {
    return res.json()
      .then(data => ({ status, data })); 
  }
  else {
    return res.json().then(errorMessage => Promise.reject({ status, errorMessage }));
  }
};


export const registerUser = (username, email, password, re_password) => {
  return fetch(`${API_URL}/api/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, re_password}),
  }).then(checkResponse);
};

export const CreateMemory = (data) => { 
    return fetch(`${API_URL}/api/memory/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Token ${auth_token}`,
      },
      body: data
    }).then(checkResponse);
  };

export const loginUser = (username, password) => {
    return fetch(`${API_URL}/api/auth/token/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(checkResponse)
      .then(({ status, data }) => {
        if (data) {
          global.auth_token = data.auth_token;
          return status;
        }
        return null;
      });
  };

export const CreatePost = (data) => {
    return fetch(`${API_URL}/api/post/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Token ${auth_token}`,
      },
      body: data
    })
      .then(checkResponse)
  };

export const MemoryListForMap = () => {
  return fetch(`${API_URL}/api/memory/cart/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Token ${auth_token}`,
    },
  });
}

export const MemoryList = () => {
  return fetch(`${API_URL}/api/memory/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Token ${auth_token}`,
    },
  });
}

export const ChengeMemory = (data, id) => {
  return fetch(`${API_URL}/api/memory/${id}/`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Token ${auth_token}`,
      },
      body: data
  })
      .then(checkResponse)
  };

export const getUserMe = () => {
  return fetch(`${API_URL}/api/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Token ${auth_token}`,
    },
  })
    .then(checkResponse);
};

export const getMemory = (id) => {
  return fetch(`${API_URL}/api/memory/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Token ${auth_token}`,
    },
  })
    .then(checkResponse);
};

export const ChengeUserMe = (data) => {
  return fetch(`${API_URL}/api/users/me/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Token ${auth_token}`,
    },
    body: data
  })
    .then(checkResponse)
};