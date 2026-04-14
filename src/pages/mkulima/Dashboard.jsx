import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../../components/mkulima/Sidebar'
import Header from '../../components/mkulima/Header'
import Animals from './Animals'
import Vaccinations from './Vaccinations'
import Consultations from './Consultations'
import Profile from './Profile'

export default function MkulimaDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<Navigate to="animals" replace />} />
            <Route path="animals" element={<Animals />} />
            <Route path="vaccinations" element={<Vaccinations />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}