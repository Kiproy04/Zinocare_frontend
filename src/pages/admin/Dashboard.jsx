import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'
import Overview from './Overview'
import Users from './Users'
import Animals from './Animals'
import Consultations from './Consultations'
import Schedules from './Schedules'
import Records from './Records'
import Vaccines from './Vaccines'

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="animals" element={<Animals />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="vaccines" element={<Vaccines />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="records" element={<Records />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}