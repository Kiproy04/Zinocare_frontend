import { useState, useEffect } from 'react'
import { getUsers, getAllAnimals, getAllConsultations } from '../../api/admin'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import { extractResults } from '../../utils/pagination'
import { getErrorMessage } from '../../utils/errors'

export default function Overview() {
  const [stats, setStats] = useState({ farmers: 0, vets: 0, animals: 0, consultations: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [farmersRes, vetsRes, animalsRes, consultationsRes] = await Promise.all([
          getUsers('mkulima'),
          getUsers('vet'),
          getAllAnimals(),
          getAllConsultations(),
        ])
        setStats({
          farmers: farmersRes.data.count ?? extractResults(farmersRes.data).length,
          vets: vetsRes.data.count ?? extractResults(vetsRes.data).length,
          animals: animalsRes.data.count ?? extractResults(animalsRes.data).length,
          consultations: consultationsRes.data.count ?? extractResults(consultationsRes.data).length,
        })
      } catch (err) {
        toast.error(getErrorMessage(err, 'Failed to load stats.'))
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Farmers', value: stats.farmers, icon: '👨‍🌾', color: 'bg-green-50 text-green-700' },
    { label: 'Vets', value: stats.vets, icon: '👨‍⚕️', color: 'bg-blue-50 text-blue-700' },
    { label: 'Animals', value: stats.animals, icon: '🐄', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Consultations', value: stats.consultations, icon: '🩺', color: 'bg-purple-50 text-purple-700' },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">System Overview</h2>
      {loading ? (
        <Spinner color="purple" />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl ${card.color} mb-4`}>
                {card.icon}
              </div>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}