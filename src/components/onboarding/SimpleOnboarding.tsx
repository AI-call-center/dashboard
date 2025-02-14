import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  agentTemplates, 
  type AgentTemplate, 
  type CallDirection, 
  type AgentCategory,
  categoryColors,
  directionLabels,
} from '../../data/agentTemplates';
import {
  ChevronRightIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface SimpleOnboardingProps {
  onComplete: () => void;
}

const SimpleOnboarding = ({ onComplete }: SimpleOnboardingProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [agentName, setAgentName] = useState('');
  const [voice, setVoice] = useState('Christopher');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<CallDirection | null>(null);

  const handleCreateAgent = async () => {
    if (!selectedTemplate || !agentName) return;

    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsCreating(false);
    onComplete();
  };

  const handleNext = () => {
    if (step === 1 && selectedCategory && selectedDirection) {
      setStep(2);
    } else if (step === 2 && selectedTemplate) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedTemplate(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const steps = [
    { number: 1, title: 'Choose Purpose' },
    { number: 2, title: 'Select Template' },
    { number: 3, title: 'Quick Setup' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-center relative">
            {steps.map((s, i) => (
              <div key={s.number} className="flex-1 flex items-center">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10 ${step >= s.number ? 'bg-dashboard-accent border-dashboard-accent' : 'bg-gray-800 border-gray-700'}`}
                  >
                    <span className={`text-sm font-medium ${step >= s.number ? 'text-white' : 'text-gray-400'}`}>
                      {s.number}
                    </span>
                  </div>
                  <span className={`mt-2 text-sm ${step >= s.number ? 'text-white' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${step > s.number ? 'bg-dashboard-accent' : 'bg-gray-700'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {step === 1 && 'What will your AI agent do?'}
            {step === 2 && 'Choose the perfect template'}
            {step === 3 && 'Let\'s set up your agent'}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            {step === 1 && 'Select a category and call direction to find the perfect template for your needs.'}
            {step === 2 && 'Choose a template that matches your requirements. Each template is pre-configured for optimal performance.'}
            {step === 3 && 'Just a few quick details and your agent will be ready to go.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Category</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(categoryColors).map(([category, color]) => (
                      <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category as AgentCategory)}
                        className={`p-6 rounded-xl border text-left transition-colors ${selectedCategory === category
                          ? 'border-dashboard-accent bg-dashboard-accent/10'
                          : 'border-gray-800 bg-dashboard-surface hover:border-gray-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={`text-lg font-medium ${color}`}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Call Direction</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(directionLabels).map(([direction, label]) => (
                      <motion.button
                        key={direction}
                        onClick={() => setSelectedDirection(direction as CallDirection)}
                        className={`p-6 rounded-xl border text-left transition-colors ${selectedDirection === direction
                          ? 'border-dashboard-accent bg-dashboard-accent/10'
                          : 'border-gray-800 bg-dashboard-surface hover:border-gray-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg font-medium text-white">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!selectedCategory || !selectedDirection}
                    className="px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next Step</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Templates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agentTemplates
                .filter(
                  (template) =>
                    template.category === selectedCategory &&
                    template.direction === selectedDirection
                )
                .map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`cursor-pointer p-4 rounded-xl border transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'border-dashboard-accent bg-dashboard-accent/10'
                      : 'border-gray-800 bg-dashboard-surface hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      selectedTemplate?.id === template.id
                        ? 'bg-dashboard-accent/20 text-dashboard-accent'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      <template.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-white font-medium">{template.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${categoryColors[template.category]}`}>
                              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {directionLabels[template.direction]}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{template.setupTime}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <span>{template.popularity}% of users choose this</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
          </div>

              </div>

              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!selectedTemplate}
                  className="px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next Step</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              {/* Configuration */}
              <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Setup</h2>
            <div className="bg-dashboard-surface border border-gray-800 rounded-xl p-6">
              {selectedTemplate ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Agent Name
                      </label>
                      <input
                        type="text"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder={`${selectedTemplate.name} Assistant`}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Voice
                      </label>
                      <select
                        value={voice}
                        onChange={(e) => setVoice(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                      >
                        <option value="Christopher">Christopher (Male)</option>
                        <option value="Emma">Emma (Female)</option>
                        <option value="James">James (Male)</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-gray-300 mb-2">Capabilities</h3>
                      <ul className="space-y-2">
                        {selectedTemplate.capabilities.map((capability, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-400">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between mt-6 space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreateAgent}
                        disabled={!agentName || isCreating}
                        className="flex-1 px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      {isCreating ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 animate-spin" />
                          <span>Creating Agent...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Agent</span>
                          <ChevronRightIcon className="w-5 h-5" />
                        </>
                      )}
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>Select a template to configure your agent</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleOnboarding;
