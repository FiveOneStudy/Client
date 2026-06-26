import { BASE_URL, getToken } from './index';
import { useState, useEffect } from 'react';

export const fetchPosts = (sort) => {
  return fetch(`${BASE_URL}/post?sort=${sort}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export const fetchPost = (postId, sort) => {
  const url = sort ? `${BASE_URL}/post/${postId}?sort=${sort}` : `${BASE_URL}/post/${postId}`;
  return fetch(url, {
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

export const createComment = (postId, body) => {
  return fetch(`${BASE_URL}/post/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
};

export function useMyPage() {
  const [myPageData, setMyPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`${BASE_URL}/mypage`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) setMyPageData(json.data);
        else setError('데이터를 불러오지 못했습니다.');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { myPageData, loading, error };
}

export const fetchMyPosts = () => {
  return fetch(`${BASE_URL}/post/my/posts`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export const deletePost = (postId) => {
  return fetch(`${BASE_URL}/post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export const fetchMyComments = () => {
  return fetch(`${BASE_URL}/post/my/comments`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export const fetchComments = (postId) => {
  return fetch(`${BASE_URL}/post/${postId}/comments`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        const parents = json.data.filter(c => c.parentId === null);
        const children = json.data.filter(c => c.parentId !== null);

        const data = parents.map(parent => ({
          ...parent,
          children: children.filter(child => child.parentId === parent.commentId)
        }));

        return { ...json, data };
      }
      return json;
    });
};


export const deleteComment = (postId, commentId) => {
  return fetch(`${BASE_URL}/post/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }).then(res => res.json());
};

export async function fetchMyInfo() {
  try {
    const res = await fetch(`${BASE_URL}/mypage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error('fetchMyInfo 에러:', error);
    return { success: false, data: null, error: '사용자 정보를 불러오지 못했습니다.' };
  }
}

export const getProfileImageUrl = (userId) => {
  return `${BASE_URL}/profile-image/${userId}`;
};

export const getProfile = (profileImageUrl) => {
  return `${BASE_URL}${profileImageUrl}`;
};