import { useState, useEffect } from 'react'
import { getAllVaccines } from '../../api/admin'

const routeLabels = {
  IM: 'Intramuscular',
  SC: 'Subcutaneous',
  ORAL: 'Oral',
  NASAL: 'Nasal',
}

export default function Vaccines() {
  const [vaccines, setVaccines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllVaccines()
      .then(res => setVaccines(res.data))
      .catch(() => setError('Failed to load vaccines.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vaccines</h2>
        <p className="text-xs text-gray-400">Vaccines are added by vets</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading vaccines...</p>
      ) : vaccines.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">💉</p>
          <p className="text-gray-500">No vaccines registered yet.</p>
          <p className="text-gray-400 text-sm mt-1">Vets can add vaccines via their portal.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Target Species</th>
                <th className="px-6 py-3 text-left">Dose</th>
                <th className="px-6 py-3 text-left">Route</th>
                <th className="px-6 py-3 text-left">Interval</th>
                <th className="px-6 py-3 text-left">Manufacturer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vaccines.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{v.name}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">
                    {v.target_species?.join(', ') || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{v.dose || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {routeLabels[v.route] || v.route || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {v.recommended_interval_days ? `${v.recommended_interval_days} days` : '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{v.manufacturer || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}