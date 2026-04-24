import { useLocation } from 'react-router-dom'
import useAuthStore from '../../context/authStore'

const pageTitles = {
  '/admin/overview': 'Overview',
  '/admin/users': 'Users',
  '/admin/animals': 'Animals',
  '/admin/consultations': 'Consultations',
  '/admin/vaccines': 'Vaccines',
  '/admin/schedules': 'Vaccination Schedules',
  '/admin/records': 'Vaccination Records',
}

export default function Header() {
  const { user } = useAuthStore()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">{user?.email}</p>
          <p className="text-xs text-purple-600 capitalize">{user?.role}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
          {user?.email?.[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  )
}