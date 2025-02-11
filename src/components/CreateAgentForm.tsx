import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import TemplateBrowser from './TemplateBrowser';
import ToolSettings from './ToolSettings';
import VoiceCloneModal from './VoiceCloneModal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PhoneArrowUpRightIcon,
  CalendarDaysIcon,
  PhoneXMarkIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  TrashIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserCircleIcon,
  CloudArrowUpIcon,
  BoltIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

const tools: Tool[] = [
  {
    id: 'end-call',
    name: 'End Call',
    description: 'Ends the call',
    icon: PhoneXMarkIcon,
  },
  {
    id: 'appointment-scheduling',
    name: 'Appointment Scheduling',
    description: 'Real-time booking scheduling',
    icon: CalendarDaysIcon,
  },
  {
    id: 'call-transfer',
    name: 'Call Transfer',
    description: 'Transfers the call to a real assistant',
    icon: PhoneArrowUpRightIcon,
  },
];

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref">>;
}

const steps = [
  { id: 'basic-info', title: 'Basic Info', icon: UserCircleIcon },
  { id: 'behaviour', title: 'Behaviour', icon: BoltIcon },
  { id: 'knowledge', title: 'Knowledge', icon: DocumentTextIcon },
  { id: 'data-collection', title: 'Data Collection', icon: ClipboardDocumentIcon },
  { id: 'tools', title: 'Tools', icon: WrenchScrewdriverIcon },
  { id: 'actions', title: 'Actions', icon: CloudArrowUpIcon },
];

const toneOptions = [
  { id: 'professional', label: 'Professional', description: 'Formal and business-like communication' },
  { id: 'casual', label: 'Casual', description: 'Friendly and conversational tone' },
  { id: 'talkative', label: 'Talkative', description: 'Engaging and chatty personality' },
];

interface CreateAgentFormProps {
  onClose: () => void;
}

const CreateAgentForm = ({ onClose }: CreateAgentFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<{
    name: string;
    voice: string;
    tone: string;
    greeting: string;
    prompt: string;
    llm: string;
    customKnowledge: string;
    variables: { key: string; value: string; }[];
    postCallVariables: { name: string; description: string; }[];
    selectedTools: string[];
    toolSettings: Record<string, any>;
  }>({
    name: '',
    voice: 'Christopher',
    tone: '',
    greeting: '',
    prompt: '',
    llm: 'GPT 4.0',
    customKnowledge: '',
    variables: [{ key: '', value: '' }],
    postCallVariables: [{ name: '', description: '' }],
    selectedTools: [],
    toolSettings: {} as Record<string, any>,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGreetingTemplates, setShowGreetingTemplates] = useState(false);
  const [showPromptTemplates, setShowPromptTemplates] = useState(false);
  const [showVoiceCloneModal, setShowVoiceCloneModal] = useState(false);

  const validateStep = useCallback((step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.tone) newErrors.tone = 'Please select a tone';
        break;
      case 1:
        if (!formData.greeting) newErrors.greeting = 'Greeting is required';
        if (!formData.prompt) newErrors.prompt = 'Agent prompt is required';
        break;
      case 2:
        if (!formData.llm) newErrors.llm = 'Please select an LLM';
        break;
      case 3:
        formData.postCallVariables.forEach((variable, index) => {
          if (!variable.name) newErrors[`variable-${index}`] = 'Variable name is required';
        });
        break;
      case 4:
        if (formData.selectedTools.length === 0) {
          newErrors.tools = 'Please select at least one tool';
        }
        formData.selectedTools.forEach(toolId => {
          const settings = formData.toolSettings[toolId] || {};
          if (toolId === 'call-transfer') {
            if (!settings.countryCode) newErrors[`${toolId}-countryCode`] = 'Country code is required';
            if (!settings.phoneNumber) newErrors[`${toolId}-phoneNumber`] = 'Phone number is required';
            if (!settings.transferCondition) newErrors[`${toolId}-transferCondition`] = 'Transfer condition is required';
          } else if (toolId === 'end-call') {
            if (!settings.endCondition) newErrors[`${toolId}-endCondition`] = 'End condition is required';
          } else if (toolId === 'appointment-scheduling') {
            if (!settings.calendarIntegration) newErrors[`${toolId}-integration`] = 'Calendar integration is required';
            if (settings.calendarIntegration && !settings.apiKey) {
              newErrors[`${toolId}-apiKey`] = 'API key is required';
            }
          }
        });
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [currentStep, validateStep]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(() => {
    // Validate all steps before submitting
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return;
      }
    }
    // Handle form submission
    console.log('Form submitted:', formData);
  }, [validateStep, formData]);

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Agent Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: John Doe"
          className={`w-full px-4 py-2 bg-dashboard-surface border ${
            errors.name ? 'border-red-500' : 'border-gray-700'
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent transition-colors`}
        />
        {errors.name && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-1 text-red-500 text-sm mt-1"
          >
            <ExclamationCircleIcon className="w-4 h-4" />
            <span>{errors.name}</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Voice</label>
        <div className="flex space-x-4">
          <select
            value={formData.voice}
            onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
            className="flex-1 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
          >
            <option value="Christopher">Christopher</option>
            <option value="Emma">Emma</option>
            <option value="James">James</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Clone Voice</span>
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Tone</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {toneOptions.map((tone) => (
            <motion.div
              key={tone.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setFormData({ ...formData, tone: tone.id })}
              className={`cursor-pointer p-4 rounded-xl border ${
                formData.tone === tone.id
                  ? 'border-dashboard-accent bg-dashboard-accent/10'
                  : 'border-gray-700 bg-dashboard-surface'
              } transition-colors`}
            >
              <div className="font-medium text-white">{tone.label}</div>
              <div className="text-sm text-gray-400 mt-1">{tone.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBehaviour = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Greeting (Incoming)</label>
        <div className="flex space-x-4">
          <textarea
            value={formData.greeting}
            onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
            placeholder="Ex: Hello, how can I help you today?"
            className={`flex-1 px-4 py-2 bg-dashboard-surface border ${
              errors.greeting ? 'border-red-500' : 'border-gray-700'
            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent min-h-[100px]`}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowGreetingTemplates(true)}
            className="px-4 py-2 h-fit bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2"
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>Browse Templates</span>
          </motion.button>
        </div>
      </div>

      <TemplateBrowser
        isOpen={showGreetingTemplates}
        onClose={() => setShowGreetingTemplates(false)}
        onSelect={(content) => {
          setFormData({ ...formData, greeting: content });
          setShowGreetingTemplates(false);
        }}
        type="greeting"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Agent Prompt</label>
        <div className="space-y-2">
          <textarea
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            placeholder="Ex: You are a helpful assistant that can help the user with their questions..."
            className={`w-full px-4 py-2 bg-dashboard-surface border ${
              errors.prompt ? 'border-red-500' : 'border-gray-700'
            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent min-h-[150px]`}
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPromptTemplates(true)}
              className="px-4 py-2 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2"
            >
              <DocumentTextIcon className="w-5 h-5" />
              <span>Browse Templates</span>
            </motion.button>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Give more information about your agent to help it understand the user's context
        </p>
      </div>

      <TemplateBrowser
        isOpen={showPromptTemplates}
        onClose={() => setShowPromptTemplates(false)}
        onSelect={(content) => {
          setFormData({ ...formData, prompt: content });
          setShowPromptTemplates(false);
        }}
        type="prompt"
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-300">Call Variables</label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFormData({
              ...formData,
              variables: [...formData.variables, { key: '', value: '' }],
            })}
            className="px-3 py-1.5 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Row</span>
          </motion.button>
        </div>
        <div className="space-y-3">
          {formData.variables.map((variable, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-4"
            >
              <input
                type="text"
                value={variable.key}
                onChange={(e) => {
                  const newVariables = [...formData.variables];
                  newVariables[index].key = e.target.value;
                  setFormData({ ...formData, variables: newVariables });
                }}
                placeholder="Key"
                className="flex-1 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
              />
              <input
                type="text"
                value={variable.value}
                onChange={(e) => {
                  const newVariables = [...formData.variables];
                  newVariables[index].value = e.target.value;
                  setFormData({ ...formData, variables: newVariables });
                }}
                placeholder="Value"
                className="flex-1 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
              />
              {index > 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const newVariables = formData.variables.filter((_, i) => i !== index);
                    setFormData({ ...formData, variables: newVariables });
                  }}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">LLM</label>
        <select
          value={formData.llm}
          onChange={(e) => setFormData({ ...formData, llm: e.target.value })}
          className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
        >
          <option value="GPT 4.0">GPT 4.0</option>
          <option value="GPT 3.5">GPT 3.5</option>
          <option value="Claude">Claude</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Custom Knowledge</label>
        <textarea
          value={formData.customKnowledge}
          onChange={(e) => setFormData({ ...formData, customKnowledge: e.target.value })}
          placeholder="Add custom knowledge to help your agent..."
          className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent min-h-[150px]"
        />
        <p className="text-sm text-gray-400 mt-1">
          This will be used to help your agent answer questions
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Knowledge Files</label>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2"
          >
            <CloudArrowUpIcon className="w-5 h-5" />
            <span>Upload File</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2"
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>Add URL</span>
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Tools</h3>
        <p className="text-gray-400 text-sm">
          Choose tools that AI can use mid-call with the customer.
        </p>
        {errors.tools && <p className="text-red-500 text-sm">{errors.tools}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                selectedTools: prev.selectedTools.includes(tool.id)
                  ? prev.selectedTools.filter((id) => id !== tool.id)
                  : [...prev.selectedTools, tool.id],
              }));
            }}
            className={`p-4 bg-dashboard-surface border rounded-lg cursor-pointer transition-colors ${
              formData.selectedTools.includes(tool.id)
                ? 'border-dashboard-accent bg-dashboard-accent/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  formData.selectedTools.includes(tool.id)
                    ? 'bg-dashboard-accent/20 text-dashboard-accent'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <tool.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{tool.name}</h4>
                <p className="text-sm text-gray-400 mt-1">{tool.description}</p>
              </div>
            </div>
            {formData.selectedTools.includes(tool.id) && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <ToolSettings
                  toolId={tool.id}
                  settings={formData.toolSettings?.[tool.id] || {}}
                  onSettingsChange={(settings) => {
                    setFormData((prev) => ({
                      ...prev,
                      toolSettings: {
                        ...prev.toolSettings,
                        [tool.id]: settings,
                      },
                    }));
                  }}
                  errors={errors}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>



      {/* Selected Tools */}
      {formData.selectedTools.length > 0 && (
        <div className="mt-6 p-4 bg-dashboard-surface/50 border border-gray-700 rounded-lg">
          <h4 className="text-white font-medium mb-2">Selected Tools</h4>
          <div className="flex flex-wrap gap-2">
            {formData.selectedTools.map((toolId) => {
              const tool = tools.find((t) => t.id === toolId);
              return (
                <div
                  key={toolId}
                  className="px-3 py-1.5 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2"
                >
                  {tool && <tool.icon className="w-4 h-4" />}
                  <span className="text-sm">{tool?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderDataCollection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-300">Post Call Variables</label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFormData({
              ...formData,
              postCallVariables: [...formData.postCallVariables, { name: '', description: '' }],
            })}
            className="px-3 py-1.5 bg-dashboard-accent/20 text-dashboard-accent rounded-lg flex items-center space-x-2 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Row</span>
          </motion.button>
        </div>
        <div className="space-y-3">
          {formData.postCallVariables.map((variable, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-4"
            >
              <input
                type="text"
                value={variable.name}
                onChange={(e) => {
                  const newVariables = [...formData.postCallVariables];
                  newVariables[index].name = e.target.value;
                  setFormData({ ...formData, postCallVariables: newVariables });
                }}
                placeholder="Name"
                className={`flex-1 px-4 py-2 bg-dashboard-surface border ${
                  errors[`variable-${index}`] ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent`}
              />
              <input
                type="text"
                value={variable.description}
                onChange={(e) => {
                  const newVariables = [...formData.postCallVariables];
                  newVariables[index].description = e.target.value;
                  setFormData({ ...formData, postCallVariables: newVariables });
                }}
                placeholder="Description"
                className="flex-1 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
              />
              {index > 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const newVariables = formData.postCallVariables.filter((_, i) => i !== index);
                    setFormData({ ...formData, postCallVariables: newVariables });
                  }}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">You do not have any actions yet.</div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium inline-flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Action</span>
        </motion.button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderBehaviour();
      case 2:
        return renderKnowledge();
      case 3:
        return renderDataCollection();
      case 4:
        return renderTools();
      case 5:
        return renderActions();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black">
      <div className="fixed top-8 right-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg flex items-center space-x-2"
        >
          <XMarkIcon className="w-5 h-5" />
          <span>Close</span>
        </motion.button>
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <div className="space-y-1">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-colors duration-200 ${
                    index === currentStep
                      ? 'bg-dashboard-accent text-white'
                      : 'bg-dashboard-surface text-gray-400 hover:text-white hover:bg-dashboard-surface/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <step.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{step.title}</span>
                  {index < currentStep && <CheckCircleIcon className="w-5 h-5 text-green-400" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-dashboard-surface border border-gray-800 rounded-xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-white">{steps[currentStep].title}</h2>
                  <p className="text-gray-400 mt-1">Step {currentStep + 1} of {steps.length}</p>
                </div>

                {renderStepContent()}

                <div className="flex justify-between pt-6 border-t border-gray-800">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      currentStep === 0
                        ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                        : 'bg-dashboard-surface border border-gray-700 text-white'
                    }`}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                    <span>Back</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
                    className="px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium flex items-center space-x-2"
                  >
                    <span>{currentStep === steps.length - 1 ? 'Create Agent' : 'Next'}</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatePresence>
        <VoiceCloneModal
          isOpen={showVoiceCloneModal}
          onClose={() => setShowVoiceCloneModal(false)}
          onClone={(voiceName) => {
            setFormData({ ...formData, voice: voiceName });
            setShowVoiceCloneModal(false);
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default CreateAgentForm;
