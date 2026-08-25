import { useState, useEffect } from 'react'
import { getAllSchedules, getAllVaccines } from '../../api/admin'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { extractResults } from '../../utils/pagination'
import Pagination from '../../components/Pagination'
import { getErrorMessage } from '../../utils/errors'

const statusColors = {
  ACTIVE: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  PAUSED: 'bg-gray-100 text-gray-600',
}

export default function Schedules() {
  const [schedules, setSchedules] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchSchedules = async () => {
    setLoading(true)
    try {
      const res = await getAllSchedules(page)
      setSchedules(extractResults(res.data))
      setHasNext(!!res.data.next)
      setHasPrevious(!!res.data.previous)
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to load schedules.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [page])

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const res = await getAllVaccines()
        setVaccines(extractResults(res.data))
      } catch (err) {
        toast.error(getErrorMessage(err, 'Failed to load vaccines.'))
      }
    }
    fetchVaccines()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Vaccination Schedules</h2>
      {loading ? (
        <Spinner color="purple" />
      ) : schedules.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-gray-500">No vaccination schedules yet.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Animal</th>
                  <th className="px-6 py-3 text-left">Vaccine</th>
                  <th className="px-6 py-3 text-left">Next Due</th>
                  <th className="px-6 py-3 text-left">Interval</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schedules.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {s.animal_detail?.name || s.animal_detail?.species || s.animal}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {s.vaccine_detail?.name || vaccines.find((v) => v.id === s.vaccine)?.name || s.vaccine}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{s.next_due}</td>
                    <td className="px-6 py-4 text-gray-600">{s.interval_days} days</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[s.status] || 'bg-gray-100 text-gray-600'}`}>
                        {s.status}
                      </span>
                    </td>
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