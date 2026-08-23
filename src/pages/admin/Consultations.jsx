import { useState, useEffect } from 'react'
import { getAllConsultations } from '../../api/admin'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { extractResults } from '../../utils/pagination'

const statusColors = {
  REQUESTED: 'bg-blue-100 text-blue-700',
  SCHEDULED: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

export default function AdminConsultations() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllConsultations()
      .then(res => setConsultations(extractResults(res.data)))
      .catch(() => toast.error('Failed to load consultations.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">All Consultations</h2>
      {loading ? (
        <Spinner color="purple" />
      ) : consultations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">🩺</p>
          <p className="text-gray-500">No consultations yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Farmer</th>
                <th className="px-6 py-3 text-left">Vet</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Scheduled</th>
                <th className="px-6 py-3 text-left">Requested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {c.farmer_detail?.full_name || c.farmer_detail?.email || c.farmer}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {c.vet_detail?.full_name || c.vet_detail?.email || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {c.scheduled_at ? new Date(c.scheduled_at).toLocaleString() : '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(c.requested_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}