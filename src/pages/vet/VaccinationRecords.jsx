import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getRecords, createRecord, getVaccines } from '../../api/vaccinations'
import { getAnimals } from '../../api/livestock'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'

export default function VaccinationRecords() {
  const [records, setRecords] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const fetchData = async () => {
    try {
      const [recordsRes, vaccinesRes, animalsRes] = await Promise.all([
        getRecords(),
        getVaccines(),
        getAnimals(),
      ])
      setRecords(recordsRes.data)
      setVaccines(vaccinesRes.data)
      setAnimals(animalsRes.data)
    } catch {
      toast.error('Failed to load records.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await createRecord({
        animal: data.animal,
        vaccine: data.vaccine,
        date_administered: data.date_administered,
        batch_number: data.batch_number,
        notes: data.notes,
      })
      reset()
      setShowForm(false)
      toast.success('Vaccination record added successfully!')
      fetchData()
    } catch (err) {
      const errData = err.response?.data
      const message = errData?.detail ||
        (typeof errData === 'object' ? Object.values(errData).flat().join(' ') : null) ||
        'Failed to add record.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vaccination Records</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ Add Record'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Log Vaccination Record</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Animal</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('animal', { required: 'Required' })}
              >
                <option value="">Select animal</option>
                {animals.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.species} {a.breed ? `(${a.breed})` : ''}
                  </option>
                ))}
              </select>
              {errors.animal && <p className="text-red-500 text-xs mt-1">{errors.animal.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Vaccine</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="text-sm font-medium text-gray-700">Date Administered</label>
              <input
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('date_administered', { required: 'Required' })}
              />
              {errors.date_administered && <p className="text-red-500 text-xs mt-1">{errors.date_administered.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Batch Number</label>
              <input
                placeholder="e.g. BN-2024-001"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('batch_number')}
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <textarea
                rows={3}
                placeholder="Any observations or notes..."
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('notes')}
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <Spinner color="blue" />
      ) : records.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">💉</p>
          <p className="text-gray-500">No vaccination records yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "Add Record" to log a vaccination.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Animal</th>
                <th className="px-6 py-3 text-left">Vaccine</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Batch</th>
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
                    {vaccines.find(v => v.id === r.vaccine)?.name || r.vaccine}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{r.date_administered}</td>
                  <td className="px-6 py-4 text-gray-600">{r.batch_number || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">{r.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}