import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import VetDashboard from './pages/vet/Dashboard'
import MkulimaDashboard from './pages/mkulima/Dashboard'
import Unauthorized from './pages/Unauthorized'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Vet */}
        <Route path="/vet/*" element={
          <ProtectedRoute allowedRoles={['vet']}>
            <VetDashboard />
          </ProtectedRoute>
        } />

        {/* Mkulima */}
        <Route path="/mkulima/*" element={
          <ProtectedRoute allowedRoles={['mkulima']}>
            <MkulimaDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App