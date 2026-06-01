import { loginMock } from "../mocks/auth";

export const login = async (email, password) => {
  return Promise.resolve({
    data: loginMock,
  });
};