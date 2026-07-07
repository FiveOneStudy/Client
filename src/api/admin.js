// api/admin.js
import axios from "axios";
import { BASE_URL, getToken } from "./index"; // 실제 경로에 맞게 수정

const api = axios.create({ baseURL: BASE_URL });

function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 공통 응답 처리: success/error 래핑을 벗겨서 data만 반환
async function unwrap(promise) {
  const res = await promise;
  if (!res.data.success) {
    throw new Error(res.data.error?.message || "요청 처리 중 오류가 발생했습니다.");
  }
  return res.data.data;
}

export const fetchPendingCerts = () =>
  unwrap(api.get("/certifications/pending", { headers: getAuthHeader() }));

export const fetchPendingPosts = () =>
  unwrap(api.get("/posts/pending", { headers: getAuthHeader() }));

export const fetchPendingComments = () =>
  unwrap(api.get("/comments/pending", { headers: getAuthHeader() }));

export const approveCert = (id) =>
  unwrap(api.patch(`/certifications/${id}/approve`, {}, { headers: getAuthHeader() }));

export const rejectCert = (id, reason) =>
  unwrap(api.patch(`/certifications/${id}/reject`, { reason }, { headers: getAuthHeader() }));

export const approvePost = (id) =>
  unwrap(api.post(`/posts/${id}/approve`, {}, { headers: getAuthHeader() }));

export const rejectPost = (id, reason) =>
  unwrap(api.post(`/posts/${id}/reject`, { reason }, { headers: getAuthHeader() }));

export const approveComment = (id) =>
  unwrap(api.post(`/comments/${id}/approve`, {}, { headers: getAuthHeader() }));

export const rejectComment = (id, reason) =>
  unwrap(api.post(`/comments/${id}/reject`, { reason }, { headers: getAuthHeader() }));