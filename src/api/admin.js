// api/admin.js
import axios from "axios";
import { BASE_URL, getToken } from "./index";

export const fetchPendingCerts = async () => {
  return axios.get(`${BASE_URL}/admin/certifications/pending`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const fetchPendingPosts = async () => {
  return axios.get(`${BASE_URL}/admin/posts/pending`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const fetchPendingComments = async () => {
  return axios.get(`${BASE_URL}/admin/comments/pending`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const approveCert = async (id) => {
  return axios.patch(
    `${BASE_URL}/admin/certifications/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const rejectCert = async (id, reason) => {
  return axios.patch(
    `${BASE_URL}/admin/certifications/${id}/reject`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const approvePost = async (id) => {
  return axios.post(
    `${BASE_URL}/admin/posts/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const rejectPost = async (id, reason) => {
  return axios.post(
    `${BASE_URL}/admin/posts/${id}/reject`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const approveComment = async (id) => {
  return axios.post(
    `${BASE_URL}/admin/comments/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const rejectComment = async (id, reason) => {
  return axios.post(
    `${BASE_URL}/admin/comments/${id}/reject`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const fetchCertFile = async (id) => {
  const res = await axios.get(`${BASE_URL}/mypage/certifications/${id}/file`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    responseType: "blob",
  });
  return res.data;
};

export const fetchRejectReason = async (id) => {
  const res = await axios.get(`${BASE_URL}/mypage/certifications/${id}/reason`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};