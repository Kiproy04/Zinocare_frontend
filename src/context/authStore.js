import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  login: (userData, access, refresh) => {
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
    localStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData })
  },

  logout: () => {
    localStorage.clear()
    set({ user: null })
  },
}))

export default useAuthStore