import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getProfile, updateProfile } from '../../api/auth'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { getErrorMessage } from '../../utils/errors'

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        reset({
          farm_name: res.data.farm_name || '',
          location: res.data.location || '',
          full_name: res.data.user.full_name || '',
          username: res.data.user.username || '',
        })
      } catch (err) {
        toast.error(getErrorMessage(err, 'Failed to load profile.'))
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await updateProfile({ farm_name: data.farm_name, location: data.location })
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update profile.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner color="green" />

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Profile</h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500" {...register('full_name')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500" {...register('username')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Kirui Farm"
              {...register('farm_name')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Eldoret"
              {...register('location')}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}