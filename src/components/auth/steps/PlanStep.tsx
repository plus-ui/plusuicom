import { useState } from 'react'
import { subscriptionPlans } from '../../../lib/supabase'

interface PlanStepProps {
  data: any
  onComplete: (data: any) => void
  onBack: () => void
}

export default function PlanStep({ data, onComplete, onBack }: PlanStepProps) {
  const [selectedPlan, setSelectedPlan] = useState(data?.selectedPlan || 'pro')

  const handleContinue = () => {
    const selectedPlanData = subscriptionPlans.find(plan => plan.id === selectedPlan)
    onComplete({
      selectedPlan,
      planData: selectedPlanData
    })
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Get started with Plus UI
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          What do you think you'll mostly use Plus UI for?
        </p>
      </div>

      {/* Plan cards */}
      <div className="space-y-4">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
              ${selectedPlan === plan.id 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {/* Selection indicator */}
            <div className="absolute top-4 right-4">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedPlan === plan.id 
                  ? 'border-indigo-500 bg-indigo-500' 
                  : 'border-gray-300'
                }
              `}>
                {selectedPlan === plan.id && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            {/* Plan header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex-shrink-0">
                {plan.id === 'community' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                )}
                {plan.id === 'pro' && (
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
                {plan.id === 'premium' && (
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500">Jump in and create something</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-sm text-gray-500">
                  {plan.period === 'forever' ? 'forever' : `per ${plan.period}`}
                </span>
                {plan.yearlyPrice && (
                  <span className="text-sm text-gray-500">
                    Billed ${plan.yearlyPrice} annually
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
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
