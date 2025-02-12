import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CreateAgentForm from '../CreateAgentForm';
import {
  UserCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to AI Call Center',
    description: 'Let\'s get you set up with your first AI agent in just a few minutes.',
    icon: RocketLaunchIcon,
  },
  {
    id: 'create-agent',
    title: 'Create Your First Agent',
    description: 'Start by creating an AI agent that will handle your calls.',
    icon: UserCircleIcon,
  },
  {
    id: 'success',
    title: 'You\'re All Set!',
    description: 'Your agent is ready to start taking calls.',
    icon: CheckCircleIcon,
  },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAgentForm, setShowAgentForm] = useState(false);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setShowAgentForm(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAgentCreated = () => {
    setShowAgentForm(false);
    setCurrentStep(2);
  };

  const renderWelcome = () => (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 mx-auto bg-dashboard-accent/20 text-dashboard-accent rounded-full flex items-center justify-center"
      >
        <RocketLaunchIcon className="w-12 h-12" />
      </motion.div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Welcome to AI Call Center</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          We'll help you set up your first AI agent and get your virtual call center running in just a few minutes.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ChevronRightIcon className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open('https://docs.example.com', '_blank')}
          className="w-full sm:w-auto px-6 py-3 bg-dashboard-surface text-white rounded-lg font-medium"
        >
          View Documentation
        </motion.button>
      </div>
    </div>
  );

  const renderCreateAgent = () => (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 mx-auto bg-dashboard-accent/20 text-dashboard-accent rounded-full flex items-center justify-center"
      >
        <UserCircleIcon className="w-12 h-12" />
      </motion.div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Create Your First Agent</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Your AI agent will handle calls, schedule appointments, and collect information based on your settings.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <span>Create Agent</span>
          <ChevronRightIcon className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="w-full sm:w-auto px-6 py-3 bg-dashboard-surface text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 mx-auto bg-green-500/20 text-green-500 rounded-full flex items-center justify-center"
      >
        <CheckCircleIcon className="w-12 h-12" />
      </motion.div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">You're All Set!</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Your agent is ready to start taking calls. You can now set up your phone number and start making calls.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full sm:w-auto px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <span>Go to Dashboard</span>
          <ChevronRightIcon className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/phone-numbers'}
          className="w-full sm:w-auto px-6 py-3 bg-dashboard-surface text-white rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <PhoneIcon className="w-5 h-5 mr-2" />
          <span>Set Up Phone Number</span>
        </motion.button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderWelcome();
      case 1:
        return renderCreateAgent();
      case 2:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: index <= currentStep ? 'rgb(59, 130, 246)' : 'rgb(31, 41, 55)',
                      borderColor: index <= currentStep ? 'rgb(59, 130, 246)' : 'rgb(75, 85, 99)',
                    }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10 bg-gray-800"
                  >
                    <step.icon className={`w-5 h-5 ${
                      index <= currentStep ? 'text-white' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: index < currentStep ? 'rgb(59, 130, 246)' : 'rgb(75, 85, 99)',
                      }}
                      className="h-1 flex-1 mx-2 rounded"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`text-sm ${
                    index <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!showAgentForm ? (
              <motion.div
                key="step-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-dashboard-surface border border-gray-800 rounded-xl p-8"
              >
                {renderStepContent()}
              </motion.div>
            ) : (
              <motion.div
                key="agent-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CreateAgentForm onClose={handleAgentCreated} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
