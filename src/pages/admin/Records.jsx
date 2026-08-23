import { useState, useEffect } from 'react'
import { getAllRecords, getAllVaccines } from '../../api/admin'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { extractResults } from '../../utils/pagination'
import Pagination from '../../components/Pagination'

export default function Records() {
  const [records, setRecords] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const res = await getAllRecords(page)
      setRecords(extractResults(res.data))
      setHasNext(!!res.data.next)
      setHasPrevious(!!res.data.previous)
    } catch {
      toast.error('Failed to load records.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [page])

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const res = await getAllVaccines()
        setVaccines(extractResults(res.data))
      } catch {
        // Fallback silently if vaccine lookup fails
      }
    }
    fetchVaccines()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Vaccination Records</h2>
      {loading ? (
        <Spinner color="purple" />
      ) : records.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">💉</p>
          <p className="text-gray-500">No vaccination records yet.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Animal</th>
                  <th className="px-6 py-3 text-left">Vaccine</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Batch</th>
                  <th className="px-6 py-3 text-left">Performed By</th>
                  <th className="px-6 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {r.animal_detail?.name || r.animal_detail?.species || r.animal}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {r.vaccine_detail?.name || vaccines.find((v) => v.id === r.vaccine)?.name || r.vaccine}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{r.date_administered}</td>
                    <td className="px-6 py-4 text-gray-600">{r.batch_number || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {r.performed_by_name || r.performed_by_email || '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{r.notes || '—'}</td>
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