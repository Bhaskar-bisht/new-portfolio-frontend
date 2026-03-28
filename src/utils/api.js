/** @format */

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

export const getAbout = () => api.get("/portfolio/profile");
export const getSkills = () => api.get("/portfolio/profile/skills");
export const getExperiences = () => api.get("/portfolio/profile/experience");
export const getSocialLinks = () => api.get("/portfolio/social-links");
export const getProjects = (params) => api.get("/portfolio/projects", { params });
export const getProject = (slug) => api.get(`/portfolio/projects/${slug}`);
export const getBlogs = (params) => api.get("/portfolio/blogs", { params });
export const getBlog = (slug) => api.get(`/portfolio/blogs/${slug}`);
export const sendContact = (data) => api.post("/portfolio/contact", data);
export const getStats = () => api.get("/portfolio/stats/overview");

export default api;
