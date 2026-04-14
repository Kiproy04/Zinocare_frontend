import api from './axios'

export const loginUser = (credentials) =>
  api.post('/api/accounts/login/', credentials)

export const registerUser = (data) =>
  api.post('/api/accounts/register/', data)

export const getProfile = () =>
  api.get('/api/accounts/profile/')

export const updateProfile = (data) =>
  api.patch('/api/accounts/profile/', data)