import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Template {
  id: string;
  title: string;
  content: string;
  category: string;
}

const templates: Template[] = [
  {
    id: 'greeting-1',
    title: 'Professional Welcome',
    content: "Hello! I'm your AI assistant. How may I help you today?",
    category: 'greeting',
  },
  {
    id: 'greeting-2',
    title: 'Friendly Welcome',
    content: "Hi there! 👋 I'm here to help make your day easier. What can I do for you?",
    category: 'greeting',
  },
  {
    id: 'greeting-3',
    title: 'Business Welcome',
    content: "Welcome to [Business Name]. I'm your virtual assistant, ready to assist you with any questions or concerns.",
    category: 'greeting',
  },
  {
    id: 'prompt-1',
    title: 'Customer Service Agent',
    content: 'You are a helpful customer service agent for [Company Name]. Your role is to assist customers with their inquiries, provide product information, and resolve any issues they may have. Always maintain a professional and friendly tone, and prioritize customer satisfaction.',
    category: 'prompt',
  },
  {
    id: 'prompt-2',
    title: 'Sales Representative',
    content: 'You are a knowledgeable sales representative for [Company Name]. Your goal is to understand customer needs, recommend suitable products/services, and guide them through the purchasing process. Be persuasive but honest, and focus on providing value to the customer.',
    category: 'prompt',
  },
  {
    id: 'prompt-3',
    title: 'Technical Support',
    content: 'You are a technical support specialist for [Company Name]. Your role is to help users troubleshoot problems, provide step-by-step guidance, and ensure their technical issues are resolved. Be patient, clear in your explanations, and thorough in your problem-solving approach.',
    category: 'prompt',
  },
];

interface TemplateBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
  type: 'greeting' | 'prompt';
}

const TemplateBrowser = ({ isOpen, onClose, onSelect, type }: TemplateBrowserProps) => {
  const filteredTemplates = templates.filter((template) => template.category === type);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-[90]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl max-h-[85vh] bg-[#0B1015] rounded-lg shadow-2xl z-[91] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-[#0B1015]">
              <h2 className="text-lg font-medium text-white">
                {type === 'greeting' ? 'Greeting Templates' : 'Agent Prompt Templates'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 gap-3 p-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(85vh - 60px)' }}>
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-[#141B23] rounded-lg hover:bg-[#1A242D] transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[15px] text-white font-medium">{template.title}</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelect(template.content)}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg flex items-center space-x-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <CheckIcon className="w-4 h-4" />
                      <span>Use Template</span>
                    </motion.button>
                  </div>
                  <p className="text-gray-400 text-[13px] leading-relaxed whitespace-pre-wrap mt-2">{template.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplateBrowser;
