import { BASE_URL, getToken } from './index';

export const fetchPosts = (sort) => {
  return fetch(`${BASE_URL}/post?sort=${sort}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export const fetchPost = (postId) => {
  return fetch(`${BASE_URL}/post/${postId}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export const createPost = (body) => {
  return fetch(`${BASE_URL}/post`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
};