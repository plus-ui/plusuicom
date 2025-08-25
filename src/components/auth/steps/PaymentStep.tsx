import { useState } from 'react'
import FormInput from '../FormInput'

interface PaymentStepProps {
  data: any
  onComplete: (data: any) => void
  onBack: () => void
}

export default function PaymentStep({ data, onComplete, onBack }: PaymentStepProps) {
  const [userCount, setUserCount] = useState(data?.userCount || 1)
  const [paymentData, setPaymentData] = useState({
    email: data?.email || '',
    cardNumber: data?.cardNumber || '',
    expiryDate: data?.expiryDate || '',
    cvc: data?.cvc || '',
    holderName: data?.holderName || '',
    country: data?.country || 'United States',
    zip: data?.zip || ''
  })
  const [loading, setLoading] = useState(false)

  const planData = data?.planData
  const basePrice = planData?.price || 129.90
  const total = basePrice * userCount

  const handleStartTrial = async () => {
    setLoading(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    onComplete({
      userCount,
      paymentData,
      trialStarted: true,
      subscriptionId: 'mock_subscription_' + Date.now()
    })
    
    setLoading(false)
  }

  const isFormValid = paymentData.email && paymentData.cardNumber && 
    paymentData.expiryDate && paymentData.cvc && paymentData.holderName && 
    paymentData.zip

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Try free for 30 days
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          or{' '}
          <button className="text-indigo-600 hover:text-indigo-500 underline">
            purchase now →
          </button>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Payment form */}
        <div className="space-y-6">
          {/* User count selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select the number of users
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setUserCount(Math.max(1, userCount - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-12 text-center text-lg font-medium">{userCount}</span>
              <button
                type="button"
                onClick={() => setUserCount(userCount + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Email */}
          <FormInput
            label="Email"
            type="email"
            value={paymentData.email}
            onChange={(value) => setPaymentData(prev => ({ ...prev, email: value }))}
            required
          />

          {/* Card information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card information
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <div className="w-6 h-4 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-6 h-4 bg-red-600 rounded"></div>
                  <div className="w-6 h-4 bg-blue-800 rounded"></div>
                  <div className="w-6 h-4 bg-orange-500 rounded"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    value={paymentData.cvc}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvc: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cardholder name */}
          <FormInput
            label="Cardholder name"
            placeholder="Full name on card"
            value={paymentData.holderName}
            onChange={(value) => setPaymentData(prev => ({ ...prev, holderName: value }))}
            required
          />

          {/* Country and ZIP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country or region
            </label>
            <div className="space-y-3">
              <select
                value={paymentData.country}
                onChange={(e) => setPaymentData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="United States">United States</option>
                <option value="Turkey">Turkey</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
              
              <input
                type="text"
                placeholder="ZIP"
                value={paymentData.zip}
                onChange={(e) => setPaymentData(prev => ({ ...prev, zip: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Start trial button */}
          <button
            type="button"
            onClick={handleStartTrial}
            disabled={loading || !isFormValid}
            className={`
              w-full flex items-center justify-center px-4 py-3 border border-transparent 
              rounded-lg text-sm font-medium text-white bg-indigo-600 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:ring-offset-2 transition-colors duration-200
              ${loading || !isFormValid 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start your free trial
              </>
            )}
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By clicking Pay, you agree to the Link Terms and Privacy Policy.
          </p>
        </div>

        {/* Right side - Order summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{userCount} item(s)</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">Zoom Workplace Pro</span>
              <span className="text-sm">£{basePrice.toFixed(2)}</span>
            </div>
            
            <div className="text-xs text-gray-500">
              Monthly subscription
            </div>
            
            <button className="text-sm text-indigo-600 hover:text-indigo-500">
              Add Coupon Code
            </button>
            
            <div className="border-t pt-3">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">excluding VAT</div>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between font-medium">
                <span>Total Billed Annually</span>
                <span>£{basePrice.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Next Charge Date: Mar 25, 2025
              </div>
            </div>
            
            <div className="bg-white p-3 rounded text-xs text-gray-600">
              Your purchase may be subject to VAT and local taxes based on the billing information 
              you provide. The final charge may be different from the amount shown here and will be 
              displayed on the payment screen before completing your purchase.
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Today's Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500">excluding VAT</div>
            </div>
          </div>
        </div>
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
