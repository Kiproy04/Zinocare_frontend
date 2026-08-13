import api from './axios'

export const getUsers = (role) =>
  api.get('/api/accounts/users/', { params: role ? { role } : {} })

export const getAllAnimals = () => api.get('/api/livestock/animal-list')
export const getAllConsultations = () => api.get('/api/consultations/')
export const getAllVaccines = () => api.get('/api/vaccinations/vaccines/')
export const getAllSchedules = () => api.get('/api/vaccinations/schedules/')
export const getAllRecords = () => api.get('/api/vaccinations/records/')