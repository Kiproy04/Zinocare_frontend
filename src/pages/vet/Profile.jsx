import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getProfile, updateProfile } from '../../api/auth'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'

export default function VetProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        reset({
          full_name: res.data.user.full_name || '',
          username: res.data.user.username || '',
          specialization: res.data.specialization || '',
          license_number: res.data.license_number || '',
          phone_number: res.data.phone_number || '',
        })
      } catch {
        toast.error('Failed to load profile.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await updateProfile({
        specialization: data.specialization,
        phone_number: data.phone_number,
      })
      toast.success('Profile updated successfully!')
    } catch {
      toast.error('Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner color="blue" />

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
            <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
            <input disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500" {...register('license_number')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('specialization')}
            >
              <option value="">Select specialization</option>
              <option value="cattle">Cattle</option>
              <option value="poultry">Poultry</option>
              <option value="goat">Goat</option>
              <option value="sheep">Sheep</option>
              <option value="mixed">Mixed Practice</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. +254712345678"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('phone_number')}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}