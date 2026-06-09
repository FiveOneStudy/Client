import axios from "axios";
import { BASE_URL } from "./index";

export const login = async (email, password) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};

export const signup = async (email, password, nickname) => {
  return axios.post(`${BASE_URL}/signup`, { email, password, nickname });
};