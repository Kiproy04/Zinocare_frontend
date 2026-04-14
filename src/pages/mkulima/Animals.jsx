import { useState, useEffect } from 'react'
import { getAnimals, addAnimal, deleteAnimal } from '../../api/livestock'
import { useForm } from 'react-hook-form'

export default function Animals() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const fetchAnimals = async () => {
    try {
      const res = await getAnimals()
      setAnimals(res.data)
    } catch {
      setError('Failed to load animals.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAnimals() }, [])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await addAnimal(data)
      reset()
      setShowForm(false)
      fetchAnimals()
    } catch (err) {
      setError(
        JSON.stringify(err.response?.data) || 'Failed to add animal.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this animal?')) return
    try {
      await deleteAnimal(id)
      fetchAnimals()
    } catch {
      setError('Failed to delete animal.')
    }
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Animals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ Add Animal'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Add Animal Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Register New Animal</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('name', { required: 'Required' })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Species</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('species', { required: 'Required' })}
              >
                <option value="">Select species</option>
                <option value="cattle">Cattle</option>
                <option value="goat">Goat</option>
                <option value="sheep">Sheep</option>
                <option value="pig">Pig</option>
                <option value="chicken">Chicken</option>
                <option value="other">Other</option>
              </select>
              {errors.species && <p className="text-red-500 text-xs mt-1">{errors.species.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Breed</label>
              <input
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('breed')}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Sex</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('sex', { required: 'Required' })}
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('date_of_birth')}
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Animal'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Animals List */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading animals...</p>
      ) : animals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">🐄</p>
          <p className="text-gray-500">No animals registered yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "Add Animal" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <div key={animal.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{animal.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{animal.species} • {animal.breed || 'Unknown breed'}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{animal.sex} • DOB: {animal.date_of_birth || 'N/A'}</p>
                </div>
                <span className="text-2xl">
                  {animal.species === 'cattle' ? '🐄' :
                   animal.species === 'goat' ? '🐐' :
                   animal.species === 'sheep' ? '🐑' :
                   animal.species === 'pig' ? '🐷' :
                   animal.species === 'chicken' ? '🐔' : '🐾'}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(animal.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}