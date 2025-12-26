import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/signup", data);

export const checkNickname = (nickname) =>
    api.get("/auth/check-nickname", { params: { nickname } });

export const checkEmail = (email) =>
    api.get("/auth/check-email", { params: { email } });