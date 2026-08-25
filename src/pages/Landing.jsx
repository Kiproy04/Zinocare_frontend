import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-green-600">Zinocare</h1>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-green-600 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          🐄 Built for African farmers & vets
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Livestock health,<br />
          <span className="text-green-600">organized.</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Zinocare connects farmers and veterinarians on one platform —
          track animals, schedule vaccinations, and request consultations,
          all in one place.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="text-gray-700 font-semibold px-8 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features by role */}
      <section className="px-6 md:px-12 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Built for everyone in the loop
          </h3>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
            Whether you're raising cattle or treating them, Zinocare has a dashboard made for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Farmer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl mb-5">
                👨‍🌾
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">For Farmers</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Register and manage your animals</li>
                <li>• Track vaccination schedules</li>
                <li>• Request vet consultations instantly</li>
              </ul>
            </div>

            {/* Vet */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-5">
                👨‍⚕️
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">For Vets</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Accept and schedule consultations</li>
                <li>• Log vaccination records</li>
                <li>• Manage your practice on the go</li>
              </ul>
            </div>

            {/* Admin */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl mb-5">
                🛡️
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">For Admins</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Oversee all users and activity</li>
                <li>• Monitor system-wide health data</li>
                <li>• Keep the platform running smoothly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-14">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div>
            <div className="text-green-600 font-bold text-3xl mb-3">1</div>
            <h4 className="font-semibold text-gray-900 mb-1">Create an account</h4>
            <p className="text-sm text-gray-500">Sign up as a farmer or vet in seconds — no paperwork.</p>
          </div>
          <div>
            <div className="text-green-600 font-bold text-3xl mb-3">2</div>
            <h4 className="font-semibold text-gray-900 mb-1">Add your animals</h4>
            <p className="text-sm text-gray-500">Register your livestock and set up vaccination schedules.</p>
          </div>
          <div>
            <div className="text-green-600 font-bold text-3xl mb-3">3</div>
            <h4 className="font-semibold text-gray-900 mb-1">Stay connected</h4>
            <p className="text-sm text-gray-500">Request consultations and track care, all in one dashboard.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 bg-green-600 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to get started?
        </h3>
        <p className="text-green-50 mb-8 max-w-xl mx-auto">
          Join Zinocare today and bring your livestock management into one simple platform.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 text-center border-t border-gray-100">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Zinocare. Built for farmers and vets everywhere.
        </p>
      </footer>

    </div>
  )
}