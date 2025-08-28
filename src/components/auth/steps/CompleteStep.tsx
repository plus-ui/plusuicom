import { useEffect } from 'react'

interface CompleteStepProps {
  data: any
  onComplete: (data: any) => void
  onBack?: () => void
}

export default function CompleteStep({ data, onComplete }: CompleteStepProps) {
  const userName = data?.firstName || 'User'

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      handleStartExploring()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleStartExploring = () => {
    onComplete({ completed: true })
  }

  return (
    <div className="space-y-8 text-center">
      {/* Success illustration */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Character illustrations */}
          <div className="flex items-end justify-center space-x-4">
            {/* Left character - blue */}
            <div className="w-16 h-20 relative">
              <div className="w-12 h-16 bg-blue-400 rounded-t-full mx-auto"></div>
              <div className="w-6 h-6 bg-blue-600 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-3 h-3 bg-blue-700 rounded-full absolute top-6 left-1/2 transform -translate-x-1/2"></div>
              {/* Arms */}
              <div className="w-4 h-8 bg-blue-400 rounded-full absolute top-8 -left-2 transform rotate-45"></div>
              <div className="w-4 h-8 bg-blue-400 rounded-full absolute top-8 -right-2 transform -rotate-45"></div>
            </div>

            {/* Center character - white */}
            <div className="w-16 h-24 relative">
              <div className="w-14 h-20 bg-white border-2 border-gray-200 rounded-t-full mx-auto"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-4 h-4 bg-gray-300 rounded-full absolute top-8 left-1/2 transform -translate-x-1/2"></div>
              {/* Arms waving */}
              <div className="w-5 h-10 bg-white border-2 border-gray-200 rounded-full absolute top-10 -left-3 transform rotate-12"></div>
              <div className="w-5 h-10 bg-white border-2 border-gray-200 rounded-full absolute top-10 -right-3 transform -rotate-12"></div>
            </div>

            {/* Right character - purple */}
            <div className="w-16 h-20 relative">
              <div className="w-12 h-16 bg-purple-400 rounded-t-full mx-auto"></div>
              <div className="w-6 h-6 bg-purple-600 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-3 h-3 bg-purple-700 rounded-full absolute top-6 left-1/2 transform -translate-x-1/2"></div>
              {/* Arms */}
              <div className="w-4 h-8 bg-purple-400 rounded-full absolute top-8 -left-2 transform rotate-45"></div>
              <div className="w-4 h-8 bg-purple-400 rounded-full absolute top-8 -right-2 transform -rotate-45"></div>
            </div>

            {/* Far right character - blue darker */}
            <div className="w-14 h-18 relative">
              <div className="w-10 h-14 bg-blue-600 rounded-t-full mx-auto"></div>
              <div className="w-5 h-5 bg-blue-800 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-2 h-2 bg-blue-900 rounded-full absolute top-5 left-1/2 transform -translate-x-1/2"></div>
              {/* Arms */}
              <div className="w-3 h-6 bg-blue-600 rounded-full absolute top-6 -left-1 transform rotate-30"></div>
              <div className="w-3 h-6 bg-blue-600 rounded-full absolute top-6 -right-1 transform -rotate-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome to Plus UI
        </h1>
        <p className="text-sm text-gray-600">
          You can add more members and edit permissions in the admin console.
        </p>
      </div>

      {/* Start button */}
      <button
        type="button"
        onClick={handleStartExploring}
        className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Start Exploring
      </button>

      {/* Auto redirect notice */}
      <p className="text-xs text-gray-500">
        You'll be automatically redirected to the dashboard in a few seconds...
      </p>
    </div>
  )
}
