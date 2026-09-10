import api from "./api";

export const getMenuItems = (params) => api.get("/menu", { params }).then((r) => r.data);
export const getMenuItem = (id) => api.get(`/menu/${id}`).then((r) => r.data);

export const createMenuItem = (formData) =>
  api
    .post("/menu", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data);

export const updateMenuItem = (id, formData) =>
  api
    .put(`/menu/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data);

export const deleteMenuItem = (id) => api.delete(`/menu/${id}`).then((r) => r.data);

export const getDashboardStats = () => api.get("/dashboard").then((r) => r.data);
