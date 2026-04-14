import { useNavigate } from 'react-router-dom'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Back to Login
      </button>
    </div>
  )
}