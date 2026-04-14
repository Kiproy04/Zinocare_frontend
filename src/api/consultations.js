import api from './axios'

export const getConsultations = () => api.get('/api/consultations/')
export const requestConsultation = (data) => api.post('/api/consultations/request/', data)
export const cancelConsultation = (id, data) => api.patch(`/api/consultations/cancel/${id}/`, data)
export const scheduleConsultation = (id, data) => api.patch(`/api/consultations/schedule/${id}/`, data)
export const completeConsultation = (id, data) => api.patch(`/api/consultations/complete/${id}/`, data)