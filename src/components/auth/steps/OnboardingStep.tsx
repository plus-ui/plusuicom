import { useState } from 'react'

interface OnboardingStepProps {
  data: any
  onComplete: (data: any) => void
  onBack: () => void
}

type UsageType = 'personal' | 'work' | 'education'

export default function OnboardingStep({ data, onComplete, onBack }: OnboardingStepProps) {
  const [selectedType, setSelectedType] = useState<UsageType>(data?.usageType || 'work')
  const userName = data?.firstName || 'User'

  const handleContinue = () => {
    onComplete({
      usageType: selectedType
    })
  }

  const usageOptions = [
    {
      id: 'personal' as const,
      title: 'Personal',
      description: 'Learn new insights and inspiration on website and application design.',
      icon: (
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'work' as const,
      title: 'Work',
      description: 'Learn new insights and inspiration on website and application design.',
      icon: (
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'education' as const,
      title: 'Education',
      description: 'Learn new insights and inspiration on website and application design.',
      icon: (
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome to Plus UI, {userName}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          What do you think you'll mostly use Plus UI for?
        </p>
      </div>

      {/* Usage type cards */}
      <div className="space-y-4">
        {usageOptions.map((option) => (
          <div
            key={option.id}
            className={`
              relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200
              ${selectedType === option.id 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => setSelectedType(option.id)}
          >
            {/* Selection indicator */}
            <div className="absolute top-4 right-4">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedType === option.id 
                  ? 'border-indigo-500 bg-indigo-500' 
                  : 'border-gray-300'
                }
              `}>
                {selectedType === option.id && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            {/* Card content */}
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon with geometric pattern background */}
              <div className="relative">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Geometric pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="20,20 40,20 30,40" className="text-gray-400" />
                      <polygon points="60,20 80,20 70,40" className="text-gray-500" />
                      <polygon points="40,40 60,40 50,60" className="text-gray-400" />
                      <polygon points="20,60 40,60 30,80" className="text-gray-500" />
                      <polygon points="60,60 80,60 70,80" className="text-gray-400" />
                    </svg>
                  </div>
                  
                  {/* Main icon */}
                  <div className="relative z-10">
                    {option.icon}
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 max-w-xs">
                  {option.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue button */}
      <button
        type="button"
        onClick={handleContinue}
        className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Continue
      </button>

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        ← Back
      </button>
    </div>
  )
}
