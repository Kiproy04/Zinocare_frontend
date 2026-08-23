import { useState, useEffect } from 'react'
import { getAllSchedules, getAllVaccines, getAllAnimals } from '../../api/admin'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { extractResults } from '../../utils/pagination'

const statusColors = {
  ACTIVE: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  PAUSED: 'bg-gray-100 text-gray-600',
}

export default function Schedules() {
  const [schedules, setSchedules] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllSchedules(), getAllVaccines(), getAllAnimals()])
      .then(([schedulesRes, vaccinesRes, animalsRes]) => {
        setSchedules(extractResults(schedulesRes.data))
        setVaccines(extractResults(vaccinesRes.data))
        setAnimals(extractResults(animalsRes.data))
      })
      .catch(() => toast.error('Failed to load schedules.'))
      .finally(() => setLoading(false))
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
                    {vaccines.find(v => v.id === s.vaccine)?.name || s.vaccine}
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
      )}
    </div>
  )
}