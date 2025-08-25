import { useState } from 'react'

interface QuestionsStepProps {
  data: any
  onComplete: (data: any) => void
  onBack: () => void
}

export default function QuestionsStep({ data, onComplete, onBack }: QuestionsStepProps) {
  const [formData, setFormData] = useState({
    companySize: data?.companySize || '20-99',
    industry: data?.industry || 'Technology',
    workType: data?.workType || 'Creative',
    jobTitle: data?.jobTitle || 'Team member'
  })

  const handleContinue = () => {
    onComplete(formData)
  }

  const handleSkip = () => {
    onComplete({ skipped: true })
  }

  const companySizes = [
    'Just me',
    '2-19', 
    '20-99',
    '100-249',
    '250-1,000',
    '1000+'
  ]

  const jobTitles = [
    'Executive',
    'Director',
    'Business owner',
    'Manager',
    'Team member',
    'Other'
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-sm text-gray-600 hover:text-gray-800"
        >
          Skip →
        </button>
        
        {/* Progress bar */}
        <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto mb-8">
          <div className="w-3/4 h-1 bg-gray-800 rounded-full"></div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          Tell us about your work
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          We'll use this to make tailored recommendations.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {/* Company size */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            How big is the company you work at?
          </h3>
          <div className="flex flex-wrap gap-2">
            {companySizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, companySize: size }))}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${formData.companySize === size
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Industry */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What industry do you work in?
          </h3>
          <select
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Consulting">Consulting</option>
            <option value="Government">Government</option>
            <option value="Non-profit">Non-profit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Work type */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What kind of work do you do?
          </h3>
          <select
            value={formData.workType}
            onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Creative">Creative</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="HR">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Customer Success">Customer Success</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Job title */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What title fits you best?
          </h3>
          <div className="flex flex-wrap gap-2">
            {jobTitles.map((title) => (
              <button
                key={title}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, jobTitle: title }))}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${formData.jobTitle === title
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
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
