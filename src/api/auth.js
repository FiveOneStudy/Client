import axios from "axios";
import { BASE_URL, getToken } from "./index";

export const login = async (email, password) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};

export const signup = async (email, password, nickname) => {
  return axios.post(`${BASE_URL}/signup`, { email, password, nickname });
};

export const sendAuthCode = async (email) => {
  return axios.post(
    `${BASE_URL}/password/reset/code`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const resetPassword = async (email, code, newPassword) => {
  return axios.patch(
    `${BASE_URL}/password/reset`,
    { email, code, newPassword },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};