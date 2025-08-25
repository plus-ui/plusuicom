import { useState } from 'react'

interface InviteStepProps {
  data: any
  onComplete: (data: any) => void
  onBack: () => void
}

export default function InviteStep({ data, onComplete, onBack }: InviteStepProps) {
  const [emails, setEmails] = useState(data?.inviteEmails || '')
  const [loading, setLoading] = useState(false)

  const handleInvite = async () => {
    setLoading(true)
    
    // Simulate sending invitations
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const emailList = emails
      .split(/[,\s;]+/)
      .filter(email => email.trim() && email.includes('@'))
    
    onComplete({
      inviteEmails: emails,
      invitedUsers: emailList,
      invitesSent: emailList.length
    })
    
    setLoading(false)
  }

  const handleSkip = () => {
    onComplete({ skipped: true })
  }

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
          <div className="w-full h-1 bg-gray-800 rounded-full"></div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          Invite people to join your team
        </h1>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm text-gray-700">Collaborate your workspace</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm text-gray-700">Create team projects</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zM3 7a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM4 3a1 1 0 000 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm text-gray-700">Save for your team</span>
        </div>
      </div>

      {/* Email input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emails
        </label>
        <textarea
          placeholder="Add emails separated by space, comma or semicolon"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
      </div>

      {/* What happens next */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          What happens next?
        </h3>
        <ol className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
              1
            </span>
            <span>People get an email invite to join your team.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
              2
            </span>
            <span>They can access the team what you create and manage workspace</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
              3
            </span>
            <span>You can add more members and edit permissions in the admin console.</span>
          </li>
        </ol>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        {emails.trim() ? (
          <button
            type="button"
            onClick={handleInvite}
            disabled={loading}
            className={`
              w-full flex items-center justify-center px-4 py-2.5 border border-transparent 
              rounded-lg text-sm font-medium text-white bg-indigo-600 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:ring-offset-2 transition-colors duration-200
              ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending invites...
              </>
            ) : (
              'Invite'
            )}
          </button>
        ) : null}
        
        <button
          type="button"
          onClick={handleSkip}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Skip for now
        </button>
      </div>

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
