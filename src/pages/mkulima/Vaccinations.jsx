import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getSchedules, createSchedule, getVaccines } from '../../api/vaccinations'
import { getAnimals } from '../../api/livestock'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import { extractResults } from '../../utils/pagination'

const statusColors = {
  ACTIVE: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  PAUSED: 'bg-gray-100 text-gray-600',
}

export default function Vaccinations() {
  const [schedules, setSchedules] = useState([])
  const [animals, setAnimals] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [schedulesRes, animalsRes, vaccinesRes] = await Promise.all([
        getSchedules(page),
        getAnimals(1, 100), // fetch enough for dropdown
        getVaccines(1),
      ])
      setSchedules(extractResults(schedulesRes.data))
      setHasNext(!!schedulesRes.data.next)
      setHasPrevious(!!schedulesRes.data.previous)
      setAnimals(extractResults(animalsRes.data))
      setVaccines(extractResults(vaccinesRes.data))
    } catch {
      toast.error('Failed to load vaccination data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [page])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await createSchedule({
        animal: data.animal,
        vaccine: data.vaccine,
        next_due: data.next_due,
        interval_days: parseInt(data.interval_days),
      })
      reset()
      setShowForm(false)
      toast.success('Vaccination schedule created!')
      setPage(1)
      fetchData()
    } catch (err) {
      const errData = err.response?.data
      const message = errData?.detail ||
        (typeof errData === 'object' ? Object.values(errData).flat().join(' ') : null) ||
        'Failed to create schedule.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vaccination Schedules</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ New Schedule'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule Vaccination</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Animal</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('animal', { required: 'Required' })}
              >
                <option value="">Select animal</option>
                {animals.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.species})</option>
                ))}
              </select>
              {errors.animal && <p className="text-red-500 text-xs mt-1">{errors.animal.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Vaccine</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('vaccine', { required: 'Required' })}
              >
                <option value="">Select vaccine</option>
                {vaccines.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
              {errors.vaccine && <p className="text-red-500 text-xs mt-1">{errors.vaccine.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Next Due Date</label>
              <input
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('next_due', { required: 'Required' })}
              />
              {errors.next_due && <p className="text-red-500 text-xs mt-1">{errors.next_due.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Interval (days)</label>
              <input
                type="number"
                placeholder="e.g. 30"
                min="1"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('interval_days', { required: 'Required', min: 1 })}
              />
              {errors.interval_days && <p className="text-red-500 text-xs mt-1">{errors.interval_days.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Schedule'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <Spinner color="green" />
      ) : schedules.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">💉</p>
          <p className="text-gray-500">No vaccination schedules yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "New Schedule" to get started.</p>
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
          <Pagination page={page} setPage={setPage} hasNext={hasNext} hasPrevious={hasPrevious} />
        </>
      )}
    </div>
  )
}