import api from './axios'

export const loginUser = (credentials) => api.post('/accounts/login/', credentials)
export const registerUser = (data) => api.post('/accounts/register/', data)
export const getProfile = () => api.get('/accounts/profile/')
export const updateProfile = (data) => api.patch('/accounts/profile/', data)