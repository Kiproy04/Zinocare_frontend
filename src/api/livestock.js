import api from './axios'

export const getAnimals = () => api.get('/livestock/animal-list')
export const addAnimal = (data) => api.post('/livestock/animal-list', data)
export const updateAnimal = (id, data) => api.patch(`/livestock/animal-detail/${id}/`, data)
export const deleteAnimal = (id) => api.delete(`/livestock/animal-detail/${id}/`)