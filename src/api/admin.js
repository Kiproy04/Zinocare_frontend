import api from './axios'

export const getUsers = (role) => api.get('/accounts/users/', { params: role ? { role } : {} })
export const getAllAnimals = () => api.get('/livestock/animal-list')
export const getAllConsultations = () => api.get('/consultations/')
export const getAllVaccines = () => api.get('/vaccinations/vaccines/')
export const getAllSchedules = () => api.get('/vaccinations/schedules/')
export const getAllRecords = () => api.get('/vaccinations/records/')