import Link from 'next/link';
import './globals.css'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center px-4">
      
      <main className="flex flex-col items-center justify-center w-full max-w-4xl text-center">
        <div className="space-y-6">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="bg-indigo-500 p-4 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">
            <span className="block">QuickNote</span>
            <span className="block text-indigo-600 mt-2">Capture Your Thoughts</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The fastest way to jot down ideas, tasks, and reminders. 
            Simple, clean, and always ready when inspiration strikes.
          </p>
          
          <div className="pt-6">
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition duration-300 transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}