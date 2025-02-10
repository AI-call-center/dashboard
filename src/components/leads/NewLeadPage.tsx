import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface Variable {
  id: string;
  key: string;
  value: string;
}

interface FormErrors {
  phone?: string;
  name?: string;
  email?: string;
}

interface NewLeadPageProps {
  onBack?: () => void;
}

const NewLeadPage = ({ onBack }: NewLeadPageProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [variables, setVariables] = useState<Variable[]>([
    { id: '1', key: '', value: '' },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePhone = (value: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value === '' || emailRegex.test(value);
  };

  const handleAddVariable = () => {
    setVariables([
      ...variables,
      { id: Math.random().toString(), key: '', value: '' },
    ]);
  };

  const handleRemoveVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id));
  };

  const handleUpdateVariable = (
    id: string,
    field: 'key' | 'value',
    value: string
  ) => {
    setVariables(
      variables.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      )
    );
  };

  const handleSave = (addAnother: boolean = false) => {
    const newErrors: FormErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (phone && !validatePhone(phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Save the lead
      console.log('Saving lead:', { phone, name, email, variables });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      if (addAnother) {
        // Reset form for new lead
        setPhone('');
        setName('');
        setEmail('');
        setVariables([{ id: '1', key: '', value: '' }]);
      } else {
        // Go back to leads list
        onBack?.();
      }
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Leads
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            New Lead
          </h1>
          <p className="text-gray-400 mt-1">
            Create a new lead with their contact information and custom variables.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl space-y-6">
        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Phone Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971123456789"
              className={`flex-1 px-4 py-2 bg-gray-800 border ${
                errors.phone ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <XCircleIcon className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: John Doe"
            className={`w-full px-4 py-2 bg-gray-800 border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <XCircleIcon className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: john@doe.com"
            className={`w-full px-4 py-2 bg-gray-800 border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <XCircleIcon className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Variables Section */}
        <div className="space-y-4 pt-6 mt-6 border-t border-gray-800">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-200">Variables</h2>
            <p className="text-gray-400 text-sm">
              Add variables for your lead to be used in the call by the agent.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-300">
              Variables
            </label>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddVariable}
              className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Row
            </motion.button>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {variables.map((variable) => (
                <motion.div
                  key={variable.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={variable.key}
                    onChange={(e) =>
                      handleUpdateVariable(variable.id, 'key', e.target.value)
                    }
                    placeholder="Variable name"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    value={variable.value}
                    onChange={(e) =>
                      handleUpdateVariable(variable.id, 'value', e.target.value)
                    }
                    placeholder="Default value will be used if empty"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveVariable(variable.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Save Buttons */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-400">
            <span className="text-red-500">*</span> Required fields
          </p>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSave(true)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Save & Add Another
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSave(false)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              Save
            </motion.button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Lead created successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewLeadPage;
