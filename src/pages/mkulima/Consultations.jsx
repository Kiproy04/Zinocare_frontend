import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getConsultations, requestConsultation, cancelConsultation } from '../../api/consultations'

const statusColors = {
  REQUESTED: 'bg-blue-100 text-blue-700',
  SCHEDULED: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

export default function Consultations() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      await requestConsultation({ notes: data.notes })
      reset()
      setShowForm(false)
      setSuccess('Consultation requested successfully!')
      fetchConsultations()
    } catch (err) {
      setError(JSON.stringify(err.response?.data) || 'Failed to request consultation.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (id) => {
    if (!confirm('Cancel this consultation?')) return
    try {
      await cancelConsultation(id, { reason: 'Cancelled by farmer' })
      fetchConsultations()
    } catch (err) {
      setError(JSON.stringify(err.response?.data) || 'Failed to cancel.')
    }
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Consultations</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ Request Consultation'}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">{success}</div>
      )}

      {/* Request Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Request a Vet Consultation</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Describe your concern
              </label>
              <textarea
                rows={4}
                placeholder="e.g. My cattle has been limping for 2 days..."
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('notes')}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Consultations List */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading consultations...</p>
      ) : consultations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">🩺</p>
          <p className="text-gray-500">No consultations yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "Request Consultation" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      Requested: {new Date(c.requested_at).toLocaleDateString()}
                    </span>
                  </div>

                  {c.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Notes:</span> {c.notes}
                    </p>
                  )}

                  {c.scheduled_at && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Scheduled:</span>{' '}
                      {new Date(c.scheduled_at).toLocaleString()}
                    </p>
                  )}

                  {c.vet && (
                    <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Vet:</span>{' '}
                        {c.vet_detail?.full_name || c.vet_detail?.email || c.vet}
                    </p>
                    )}
                </div>

                {/* Cancel button - only for REQUESTED or SCHEDULED */}
                {['REQUESTED', 'SCHEDULED'].includes(c.status) && (
                  <button
                    onClick={() => handleCancel(c.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}