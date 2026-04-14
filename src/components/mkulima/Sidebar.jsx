import { NavLink } from 'react-router-dom'
import useAuthStore from '../../context/authStore'

const links = [
  { to: '/mkulima/animals', label: '🐄 My Animals' },
  { to: '/mkulima/vaccinations', label: '💉 Vaccinations' },
  { to: '/mkulima/consultations', label: '🩺 Consultations' },
  { to: '/mkulima/profile', label: '👤 Profile' },
]

export default function Sidebar() {
  const { logout } = useAuthStore()

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b">
        <h1 className="text-2xl font-bold text-green-600">Zinocare</h1>
        <p className="text-xs text-gray-400 mt-1">Mkulima Portal</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t">
        <button
          onClick={logout}
          className="w-full text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition text-left"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  )
}