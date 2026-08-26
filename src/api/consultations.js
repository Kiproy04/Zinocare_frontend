import api from './axios'

export const getConsultations = (page = 1) => api.get('/consultations/', { params: { page } })
export const requestConsultation = (data) => api.post('/consultations/', data)
export const cancelConsultation = (id, data) => api.patch(`/consultations/${id}/cancel/`, data)
export const scheduleConsultation = (id, data) => api.patch(`/consultations/${id}/schedule/`, data)
export const completeConsultation = (id, data) => api.patch(`/consultations/${id}/complete/`, data)