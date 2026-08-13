import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getRecords, createRecord } from '../../api/vaccinations'
import { getVaccines } from '../../api/vaccinations'

export default function VaccinationRecords() {
  const [records, setRecords] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const fetchData = async () => {
    try {
      const [recordsRes, vaccinesRes] = await Promise.all([
        getRecords(),
        getVaccines(),
      ])
      setRecords(recordsRes.data)
      setVaccines(vaccinesRes.data)
    } catch {
      setError('Failed to load records.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    setSuccess('')
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
      setSuccess('Vaccination record added successfully!')
      fetchData()
    } catch (err) {
      setError(JSON.stringify(err.response?.data) || 'Failed to add record.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vaccination Records</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ Add Record'}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">{success}</div>
      )}

      {/* Add Record Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Log Vaccination Record</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700">Animal UUID</label>
              <input
                placeholder="Paste animal UUID"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('animal', { required: 'Required' })}
              />
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

      {/* Records List */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading records...</p>
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