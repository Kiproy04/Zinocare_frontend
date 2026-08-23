import api from './axios'

export const getAnimals = (page = 1) =>
  api.get('/livestock/animal-list', { params: { page } })
export const addAnimal = (data) => api.post('/livestock/animal-list', data)
export const updateAnimal = (id, data) => api.patch(`/livestock/animal-detail/${id}/`, data)
export const deleteAnimal = (id) => api.delete(`/livestock/animal-detail/${id}/`)