import api from './axios'

export const getUsers = (role, page = 1) =>
  api.get('/accounts/users/', { params: { role, page } })
export const getAllAnimals = (page = 1) => api.get('/livestock/animals/', { params: { page } })
export const getAllConsultations = (page = 1) => api.get('/consultations/', { params: { page } })
export const getAllVaccines = (page = 1) => api.get('/vaccinations/vaccines/', { params: { page } })
export const getAllSchedules = (page = 1) => api.get('/vaccinations/schedules/', { params: { page } })
export const getAllRecords = (page = 1) => api.get('/vaccinations/records/', { params: { page } })