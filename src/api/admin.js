import api from './axios'

export const getUsers = (role) =>
  api.get('/api/accounts/users/', { params: role ? { role } : {} })

export const getAllAnimals = () => api.get('/api/livestock/animal-list')

export const getAllConsultations = () => api.get('/api/consultations/')