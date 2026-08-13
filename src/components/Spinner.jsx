export default function Spinner({ size = 'md', color = 'green' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  }
  const colors = {
    green: 'border-green-600 border-t-transparent',
    blue: 'border-blue-600 border-t-transparent',
    purple: 'border-purple-600 border-t-transparent',
    white: 'border-white border-t-transparent',
  }

  return (
    <div className="flex items-center justify-center w-full py-12">
      <div className={`rounded-full animate-spin ${sizes[size]} ${colors[color]}`} />
    </div>
  )
}