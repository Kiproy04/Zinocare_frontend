import api from './axios'

export const getAnimals = () => api.get('/api/livestock/animal-list')
export const addAnimal = (data) => api.post('/api/livestock/animal-list', data)
export const updateAnimal = (id, data) => api.patch(`/api/livestock/animal-detail/${id}/`, data)
export const deleteAnimal = (id) => api.delete(`/api/livestock/animal-detail/${id}/`)