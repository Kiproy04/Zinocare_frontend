import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../../components/vet/Sidebar'
import Header from '../../components/vet/Header'
import Consultations from './Consultations'
import VaccinationRecords from './VaccinationRecords'
import Profile from './Profile'

export default function VetDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<Navigate to="consultations" replace />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="records" element={<VaccinationRecords />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}