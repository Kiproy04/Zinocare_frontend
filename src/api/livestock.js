import api from './axios'

export const getAnimals = (page = 1) => api.get('/livestock/animals/', { params: { page } })
export const addAnimal = (data) => api.post('/livestock/animals/', data)
export const updateAnimal = (id, data) => api.patch(`/livestock/animals/${id}/`, data)
export const deleteAnimal = (id) => api.delete(`/livestock/animals/${id}/`)