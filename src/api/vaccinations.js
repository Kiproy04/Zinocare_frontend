import api from './axios'

export const getVaccines = () => api.get('/api/vaccinations/vaccines/')
export const getSchedules = () => api.get('/api/vaccinations/schedules/')
export const createSchedule = (data) => api.post('/api/vaccinations/schedules/', data)
export const getRecords = () => api.get('/api/vaccinations/records/')
export const createRecord = (data) => api.post('/api/vaccinations/records/', data)