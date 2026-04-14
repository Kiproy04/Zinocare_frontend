import { useState, useEffect } from 'react'
import { getAllAnimals } from '../../api/admin'

export default function AdminAnimals() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllAnimals()
      .then(res => setAnimals(res.data))
      .catch(() => setError('Failed to load animals.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">All Animals</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading animals...</p>
      ) : animals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">🐄</p>
          <p className="text-gray-500">No animals registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Species</th>
                <th className="px-6 py-3 text-left">Breed</th>
                <th className="px-6 py-3 text-left">Sex</th>
                <th className="px-6 py-3 text-left">DOB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {animals.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{a.name || '—'}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{a.species}</td>
                  <td className="px-6 py-4 text-gray-600">{a.breed || '—'}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{a.sex || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{a.date_of_birth || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}