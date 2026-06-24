import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <span className="text-purple-600 font-bold text-lg">
            Women Safety
          </span>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
            Women Safety Awareness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A dedicated platform empowering women with safety resources,
            emergency contacts, live location sharing, and one-tap speed dial
            access to help — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16" aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10"
          >
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-4xl mb-4 block" aria-hidden="true">🚨</span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Emergency Contacts
              </h3>
              <p className="text-gray-600 text-sm">
                One-tap access to Police, Women Helpline, Ambulance, and Fire
                Brigade with instant call capability.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-4xl mb-4 block" aria-hidden="true">📍</span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Live Location Sharing
              </h3>
              <p className="text-gray-600 text-sm">
                Share your real-time location with trusted contacts instantly
                during emergencies.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-4xl mb-4 block" aria-hidden="true">☎️</span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Speed Dial
              </h3>
              <p className="text-gray-600 text-sm">
                Floating quick-access button to reach police and helplines with a
                single tap from any page.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-4xl mb-4 block" aria-hidden="true">💡</span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Safety Tips
              </h3>
              <p className="text-gray-600 text-sm">
                Curated safety guidelines for travel, workplace, and online
                scenarios to keep you prepared.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16" aria-labelledby="how-it-works-heading">
          <h2
            id="how-it-works-heading"
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10"
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 font-bold rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Register</h3>
              <p className="text-gray-600 text-sm">
                Create your account with a simple registration process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 font-bold rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Login</h3>
              <p className="text-gray-600 text-sm">
                Sign in to access all safety features and resources.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 font-bold rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Stay Safe</h3>
              <p className="text-gray-600 text-sm">
                Use emergency contacts, share location, and read safety tips
                anytime.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-purple-50 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Your Safety Is Our Priority
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join today and get instant access to emergency resources, location
            sharing, and safety awareness content designed specifically for women.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Create Free Account
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 Women Safety Awareness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
