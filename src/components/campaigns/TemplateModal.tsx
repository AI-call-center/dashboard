import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Template {
  id: string;
  content: string;
  tags: string[];
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: string) => void;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    content: `Hi {customer_name}! This is {agent_name} from {company_name}. I noticed you recently showed interest in our services.`,
    tags: ['sales', 'introduction', 'lead-generation'],
  },
  {
    id: '2',
    content: `Hello {customer_name}, {agent_name} here from {company_name}. I wanted to follow up on your recent inquiry about our products.`,
    tags: ['follow-up', 'sales'],
  },
  {
    id: '3',
    content: `Good day {customer_name}! {agent_name} from {company_name} here. We're reaching out to our valued customers about our latest offerings.`,
    tags: ['promotion', 'existing-customer'],
  },
  {
    id: '4',
    content: `Hi {customer_name}, this is {agent_name} calling from {company_name}. I'm following up on the support ticket you submitted.`,
    tags: ['support', 'follow-up'],
  },
  {
    id: '5',
    content: `{customer_name}, {agent_name} here from {company_name}. I wanted to personally thank you for being a loyal customer.`,
    tags: ['customer-retention', 'appreciation'],
  },
];

const allTags = Array.from(
  new Set(mockTemplates.flatMap((template) => template.tags))
).sort();

const TemplateModal = ({ isOpen, onClose, onSelect }: TemplateModalProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => template.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-dashboard-surface border border-gray-700 rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-medium text-white">
                  Browse Message Templates
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-gray-700"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Search and Tags */}
              <div className="p-6 border-b border-gray-700 space-y-4">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Filter by Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          selectedTags.includes(tag)
                            ? 'bg-dashboard-accent text-white'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Templates List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={false}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 border border-gray-700 rounded-lg hover:border-dashboard-accent/50 cursor-pointer group"
                    onClick={() => {
                      onSelect(template.content);
                      onClose();
                    }}
                  >
                    <p className="text-white mb-3 group-hover:text-dashboard-accent">
                      {template.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplateModal;
