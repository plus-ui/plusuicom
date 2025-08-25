import { useState, useEffect } from 'react'
import { 
  type RegisterStep, 
  getRegisterProgress, 
  saveRegisterProgress,
  clearRegisterProgress 
} from '../../lib/auth'

// Import step components
import AccountStep from './steps/AccountStep'
import PlanStep from './steps/PlanStep'
import PaymentStep from './steps/PaymentStep'
import OnboardingStep from './steps/OnboardingStep'
import QuestionsStep from './steps/QuestionsStep'
import InviteStep from './steps/InviteStep'
import CompleteStep from './steps/CompleteStep'

export default function RegisterFlow() {
  const [currentStep, setCurrentStep] = useState<RegisterStep>('account')
  const [registerData, setRegisterData] = useState<any>({})

  useEffect(() => {
    // Load saved progress on mount
    const { step, data } = getRegisterProgress()
    setCurrentStep(step)
    if (data) {
      setRegisterData(data)
    }
  }, [])

  const handleStepComplete = (stepData: any) => {
    const updatedData = { ...registerData, ...stepData }
    setRegisterData(updatedData)

    // Determine next step
    let nextStep: RegisterStep
    switch (currentStep) {
      case 'account':
        nextStep = 'plan'
        break
      case 'plan':
        nextStep = 'payment'
        break
      case 'payment':
        nextStep = 'onboarding'
        break
      case 'onboarding':
        nextStep = 'questions'
        break
      case 'questions':
        nextStep = 'invite'
        break
      case 'invite':
        nextStep = 'complete'
        break
      case 'complete':
        // Clear progress and redirect to dashboard
        clearRegisterProgress()
        window.location.href = '/dashboard'
        return
      default:
        nextStep = 'complete'
    }

    // Save progress and move to next step
    saveRegisterProgress(nextStep, updatedData)
    setCurrentStep(nextStep)
  }

  const handleBack = () => {
    let prevStep: RegisterStep
    switch (currentStep) {
      case 'plan':
        prevStep = 'account'
        break
      case 'payment':
        prevStep = 'plan'
        break
      case 'onboarding':
        prevStep = 'payment'
        break
      case 'questions':
        prevStep = 'onboarding'
        break
      case 'invite':
        prevStep = 'questions'
        break
      default:
        return // No back for account and complete steps
    }

    saveRegisterProgress(prevStep, registerData)
    setCurrentStep(prevStep)
  }

  const renderStep = () => {
    const commonProps = {
      data: registerData,
      onComplete: handleStepComplete,
      onBack: handleBack
    }

    switch (currentStep) {
      case 'account':
        return <AccountStep {...commonProps} />
      case 'plan':
        return <PlanStep {...commonProps} />
      case 'payment':
        return <PaymentStep {...commonProps} />
      case 'onboarding':
        return <OnboardingStep {...commonProps} />
      case 'questions':
        return <QuestionsStep {...commonProps} />
      case 'invite':
        return <InviteStep {...commonProps} />
      case 'complete':
        return <CompleteStep {...commonProps} />
      default:
        return <AccountStep {...commonProps} />
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {renderStep()}
    </div>
  )
}
