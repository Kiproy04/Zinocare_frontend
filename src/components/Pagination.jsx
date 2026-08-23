export default function Pagination({ page, setPage, hasNext, hasPrevious }) {
  if (!hasNext && !hasPrevious) return null

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={!hasPrevious}
        className="text-sm px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        ← Previous
      </button>
      <span className="text-sm text-gray-500">Page {page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={!hasNext}
        className="text-sm px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next →
      </button>
    </div>
  )
}