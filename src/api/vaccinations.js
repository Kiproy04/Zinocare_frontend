import api from './axios'

export const getVaccines = () => api.get('/vaccinations/vaccines/')
export const getSchedules = () => api.get('/vaccinations/schedules/')
export const createSchedule = (data) => api.post('/vaccinations/schedules/', data)
export const getRecords = () => api.get('/vaccinations/records/')
export const createRecord = (data) => api.post('/vaccinations/records/', data)