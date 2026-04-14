import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  getConsultations,
  scheduleConsultation,
  completeConsultation,
} from '../../api/consultations'

const statusColors = {
  REQUESTED: 'bg-blue-100 text-blue-700',
  SCHEDULED: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

export default function VetConsultations() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeId, setActiveId] = useState(null)
  const [action, setAction] = useState(null)

  const { register, handleSubmit, reset } = useForm()

  const fetchConsultations = async () => {
    try {
      const res = await getConsultations()
      setConsultations(res.data)
    } catch {
      setError('Failed to load consultations.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchConsultations() }, [])

  const openAction = (id, type) => {
    setActiveId(id)
    setAction(type)
    reset()
  }

  const closeAction = () => {
    setActiveId(null)
    setAction(null)
    reset()
  }

  const onSchedule = async (data) => {
    try {
      await scheduleConsultation(activeId, {
        scheduled_at: new Date(data.scheduled_at).toISOString(),
      })
      closeAction()
      fetchConsultations()
    } catch (err) {
      setError(JSON.stringify(err.response?.data) || 'Failed to schedule.')
    }
  }

  const onComplete = async (data) => {
    try {
      await completeConsultation(activeId, { notes: data.notes })
      closeAction()
      fetchConsultations()
    } catch (err) {
      setError(JSON.stringify(err.response?.data) || 'Failed to complete.')
    }
  }

  const isPast = (dateStr) => new Date(dateStr) <= new Date()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Consultations</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading consultations...</p>
      ) : consultations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">🩺</p>
          <p className="text-gray-500">No consultations available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(c.requested_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Farmer:</span>{' '}
                    {c.farmer_detail?.full_name || c.farmer_detail?.email || c.farmer}
                  </p>

                  {c.notes && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {c.notes}
                    </p>
                  )}

                  {c.scheduled_at && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Scheduled:</span>{' '}
                      {new Date(c.scheduled_at).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-center">
                  {/* Schedule button — only for REQUESTED */}
                  {c.status === 'REQUESTED' && (
                    <button
                      onClick={() => openAction(c.id, 'schedule')}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition"
                    >
                      Schedule
                    </button>
                  )}

                  {/* Complete button — only if scheduled AND time has passed */}
                  {c.status === 'SCHEDULED' && isPast(c.scheduled_at) && (
                    <button
                      onClick={() => openAction(c.id, 'complete')}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition"
                    >
                      Complete
                    </button>
                  )}

                  {/* Upcoming badge — scheduled but not yet due */}
                  {c.status === 'SCHEDULED' && !isPast(c.scheduled_at) && (
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-lg">
                      📅 Upcoming
                    </span>
                  )}
                </div>
              </div>

              {/* Schedule Form */}
              {activeId === c.id && action === 'schedule' && (
                <div className="mt-4 border-t pt-4">
                  <form onSubmit={handleSubmit(onSchedule)} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="text-xs font-medium text-gray-700">
                        Schedule Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('scheduled_at', { required: true })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={closeAction}
                      className="text-gray-500 text-sm px-4 py-2 rounded-lg border"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}

              {/* Complete Form */}
              {activeId === c.id && action === 'complete' && (
                <div className="mt-4 border-t pt-4">
                  <form onSubmit={handleSubmit(onComplete)} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700">
                        Consultation Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Summary of the consultation..."
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register('notes')}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="submit"
                        className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg"
                      >
                        Mark Complete
                      </button>
                      <button
                        type="button"
                        onClick={closeAction}
                        className="text-gray-500 text-sm px-4 py-2 rounded-lg border"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}