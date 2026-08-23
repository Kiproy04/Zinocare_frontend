import { useState, useEffect } from 'react'
import { getAllVaccines } from '../../api/admin'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { extractResults } from '../../utils/pagination'
import Pagination from '../../components/Pagination'

const routeLabels = {
  IM: 'Intramuscular',
  SC: 'Subcutaneous',
  ORAL: 'Oral',
  NASAL: 'Nasal',
}

export default function Vaccines() {
  const [vaccines, setVaccines] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchVaccines = async () => {
    setLoading(true)
    try {
      const res = await getAllVaccines(page)
      setVaccines(extractResults(res.data))
      setHasNext(!!res.data.next)
      setHasPrevious(!!res.data.previous)
    } catch {
      toast.error('Failed to load vaccines.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVaccines()
  }, [page])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vaccines</h2>
        <p className="text-xs text-gray-400">Vaccines are added by vets</p>
      </div>

      {loading ? (
        <Spinner color="purple" />
      ) : vaccines.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">💉</p>
          <p className="text-gray-500">No vaccines registered yet.</p>
          <p className="text-gray-400 text-sm mt-1">Vets can add vaccines via their portal.</p>
        </div>
      ) : (
        <>
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
          <Pagination page={page} setPage={setPage} hasNext={hasNext} hasPrevious={hasPrevious} />
        </>
      )}
    </div>
  )
}