import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getConsultations, requestConsultation, cancelConsultation } from '../../api/consultations'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'

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

  const { register, handleSubmit, reset } = useForm()

  const fetchConsultations = async () => {
    try {
      const res = await getConsultations()
      setConsultations(res.data)
    } catch {
      toast.error('Failed to load consultations.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchConsultations() }, [])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await requestConsultation({ notes: data.notes })
      reset()
      setShowForm(false)
      toast.success('Consultation requested successfully!')
      fetchConsultations()
    } catch (err) {
      const errData = err.response?.data
      const message = errData?.detail ||
        (typeof errData === 'object' ? Object.values(errData).flat().join(' ') : null) ||
        'Failed to request consultation.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (id) => {
    if (!confirm('Cancel this consultation?')) return
    try {
      await cancelConsultation(id, { reason: 'Cancelled by farmer' })
      toast.success('Consultation cancelled.')
      fetchConsultations()
    } catch (err) {
      const errData = err.response?.data
      const message = errData?.detail ||
        (typeof errData === 'object' ? Object.values(errData).flat().join(' ') : null) ||
        'Failed to cancel.'
      toast.error(message)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Consultations</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ Request Consultation'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Request a Vet Consultation</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Describe your concern</label>
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

      {loading ? (
        <Spinner color="green" />
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