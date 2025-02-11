import { motion } from 'framer-motion';
import { useState } from 'react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

interface NewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: any) => void;
}

const NewContactModal = ({ isOpen, onClose, onSave }: NewContactModalProps) => {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    variables: [{ key: '', value: '' }]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  const addVariable = () => {
    setFormData({
      ...formData,
      variables: [...formData.variables, { key: '', value: '' }]
    });
  };

  const removeVariable = (index: number) => {
    setFormData({
      ...formData,
      variables: formData.variables.filter((_, i) => i !== index)
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-dashboard-surface border border-gray-800 rounded-xl p-6 max-w-lg w-full m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">New Lead</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ex: +971544972888"
              className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: John Doe"
              className={`w-full px-4 py-2 bg-dashboard-surface border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Ex: john@doe.com"
              className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-300">Variables</label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addVariable}
                className="text-sm text-dashboard-accent hover:text-blue-400"
              >
                Add Row
              </motion.button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-400">Key</div>
                <div className="text-sm font-medium text-gray-400">Value</div>
              </div>
              {formData.variables.map((variable, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={variable.key}
                    onChange={(e) => {
                      const newVariables = [...formData.variables];
                      newVariables[index].key = e.target.value;
                      setFormData({ ...formData, variables: newVariables });
                    }}
                    placeholder="Variable name"
                    className="px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={variable.value}
                      onChange={(e) => {
                        const newVariables = [...formData.variables];
                        newVariables[index].value = e.target.value;
                        setFormData({ ...formData, variables: newVariables });
                      }}
                      placeholder="Default value will be used if empty"
                      className="flex-1 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeVariable(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-6 py-2 bg-dashboard-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewContactModal;
