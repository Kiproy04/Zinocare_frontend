import api from './axios'

export const getConsultations = () => api.get('/consultations/')
export const requestConsultation = (data) => api.post('/consultations/request/', data)
export const cancelConsultation = (id, data) => api.patch(`/consultations/cancel/${id}/`, data)
export const scheduleConsultation = (id, data) => api.patch(`/consultations/schedule/${id}/`, data)
export const completeConsultation = (id, data) => api.patch(`/consultations/complete/${id}/`, data)