import React, { useState } from 'react';
import { BeakerIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('enthusiast@demo.com');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
                <span className="text-2xl">🍇</span>
                <span className="text-xl font-bold text-gray-900">GrapeVine</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="/admin" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Admin</a>
              <button onClick={handleDemoLogin} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">Login</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative isolate bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Discover and Catalog the World of Grapes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                GrapeVine is your personal sommelier's journal. Explore hundreds of grape varieties, log your tasting notes, and expand your palate.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button onClick={handleDemoLogin} className="rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                  Login as Demo User
                </button>
                <a href="#features" className="text-base font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="bg-white py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold leading-7 text-blue-600">Everything You Need</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Digital Wine Cellar</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                From casual enthusiast to certified sommelier, GrapeVine provides the tools you need.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                    <BookOpenIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Expansive Variety Catalog</h3>
                <p className="mt-2 text-gray-600">Browse an extensive database of grape varieties from around the world, complete with origins, descriptions, and imagery.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                    <BeakerIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Tasting Notes</h3>
                <p className="mt-2 text-gray-600">Log detailed notes for every wine you taste. Rate aromas, flavors, and finish to build your personal tasting profile.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                    <UsersIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Role-Based Access</h3>
                <p className="mt-2 text-gray-600">Whether you're an enthusiast or a sommelier contributing to the catalog, our system provides the right level of access.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} GrapeVine. All rights reserved.</p>
                <p>Powered by Manifest</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
