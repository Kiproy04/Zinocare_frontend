import api from './axios'

export const getVaccines = (page = 1) => api.get('/vaccinations/vaccines/', { params: { page } })
export const getSchedules = (page = 1) => api.get('/vaccinations/schedules/', { params: { page } })
export const createSchedule = (data) => api.post('/vaccinations/schedules/', data)
export const getRecords = (page = 1) => api.get('/vaccinations/records/', { params: { page } })
export const createRecord = (data) => api.post('/vaccinations/records/', data)