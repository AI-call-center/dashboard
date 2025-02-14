import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { agentTemplates, type AgentTemplate } from '../../data/agentTemplates';
import {
  ChevronRightIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface SimpleOnboardingProps {
  onComplete: () => void;
}

const SimpleOnboarding = ({ onComplete }: SimpleOnboardingProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [agentName, setAgentName] = useState('');
  const [voice, setVoice] = useState('Christopher');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateAgent = async () => {
    if (!selectedTemplate || !agentName) return;

    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsCreating(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create Your AI Agent
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choose a template to get started quickly. Your agent will be pre-configured with the best settings for your use case.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Choose a Template</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agentTemplates.map((template) => (
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
                        <h3 className="text-white font-medium">{template.name}</h3>
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

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateAgent}
                      disabled={!agentName || isCreating}
                      className="w-full mt-6 px-6 py-3 bg-dashboard-accent text-white rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
