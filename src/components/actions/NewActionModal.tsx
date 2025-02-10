import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface NewActionModalProps {
  action?: {
    id: string;
    name: string;
    description: string;
    type: 'Custom' | 'Zapier';
  } | null;
  onClose: () => void;
}

interface Header {
  id: string;
  key: string;
  value: string;
}

interface QueryParam {
  id: string;
  key: string;
  value: string;
}

const NewActionModal = ({ action, onClose }: NewActionModalProps) => {
  const [name, setName] = useState(action?.name || '');
  const [description, setDescription] = useState(action?.description || '');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('POST');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Header[]>([
    { id: '1', key: '', value: '' },
  ]);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([
    { id: '1', key: '', value: '' },
  ]);
  const [errors, setErrors] = useState<{
    name?: string;
    url?: string;
  }>({});

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const validate = () => {
    const newErrors: { name?: string; url?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        new URL(url);
      } catch {
        newErrors.url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Filter out empty headers and query params
    const filteredHeaders = headers.filter((h) => h.key.trim() || h.value.trim());
    const filteredParams = queryParams.filter(
      (p) => p.key.trim() || p.value.trim()
    );

    const actionData = {
      name,
      description,
      method,
      url,
      headers: filteredHeaders,
      queryParams: filteredParams,
    };

    // Implement create/update logic here
    console.log('Saving action:', actionData);
    toast.success(action ? 'Action updated successfully' : 'Action created successfully');
    onClose();
  };

  const addHeader = () => {
    setHeaders([...headers, { id: Date.now().toString(), key: '', value: '' }]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id));
  };

  const addQueryParam = () => {
    setQueryParams([
      ...queryParams,
      { id: Date.now().toString(), key: '', value: '' },
    ]);
  };

  const removeQueryParam = (id: string) => {
    setQueryParams(queryParams.filter((p) => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full space-y-6 my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-100">
            {action ? 'Edit Action' : 'New Action'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Action Type */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">Action Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-blue-500 bg-blue-500/5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="custom"
                  name="type"
                  checked
                  className="text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="custom" className="text-white font-medium">
                  Custom
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Integrate with your own API
              </p>
            </div>
            <div className="p-4 rounded-lg border border-gray-800 bg-gray-800/50 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="zapier"
                  name="type"
                  disabled
                  className="text-gray-500"
                />
                <label htmlFor="zapier" className="text-gray-400 font-medium">
                  Zapier
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500">Coming Soon!</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Add customer query"
              className={`w-full px-4 py-2 bg-gray-800 border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Add a customer query to the database. Take the user's name and email and add the call the action to add the customer to the database."
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
            />
          </div>

          {/* Method */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Ex: https://www.mywebsite.com/api/user"
                className={`w-full px-4 py-2 bg-gray-800 border ${
                  errors.url ? 'border-red-500' : 'border-gray-700'
                } rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500`}
              />
              <div className="absolute right-3 top-2.5 group">
                <InformationCircleIcon className="w-5 h-5 text-gray-400" />
                <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <p className="text-sm text-gray-300">
                    Use {'{parameter-name}'} for dynamic values
                  </p>
                </div>
              </div>
            </div>
            {errors.url && (
              <p className="mt-1 text-sm text-red-400">{errors.url}</p>
            )}
          </div>

          {/* Headers */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">
                Headers
              </label>
              <button
                onClick={addHeader}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                Add Row
              </button>
            </div>
            <div className="space-y-2">
              {headers.map((header) => (
                <div key={header.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={header.key}
                    onChange={(e) =>
                      setHeaders(
                        headers.map((h) =>
                          h.id === header.id
                            ? { ...h, key: e.target.value }
                            : h
                        )
                      )
                    }
                    placeholder="Key"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) =>
                      setHeaders(
                        headers.map((h) =>
                          h.id === header.id
                            ? { ...h, value: e.target.value }
                            : h
                        )
                      )
                    }
                    placeholder="Value"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
                  />
                  <button
                    onClick={() => removeHeader(header.id)}
                    className="p-2 text-gray-400 hover:text-gray-300"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Query Parameters */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">
                Query Parameters
              </label>
              <button
                onClick={addQueryParam}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                Add Row
              </button>
            </div>
            <div className="space-y-2">
              {queryParams.map((param) => (
                <div key={param.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) =>
                      setQueryParams(
                        queryParams.map((p) =>
                          p.id === param.id
                            ? { ...p, key: e.target.value }
                            : p
                        )
                      )
                    }
                    placeholder="Key"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) =>
                      setQueryParams(
                        queryParams.map((p) =>
                          p.id === param.id
                            ? { ...p, value: e.target.value }
                            : p
                        )
                      )
                    }
                    placeholder="Value"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
                  />
                  <button
                    onClick={() => removeQueryParam(param.id)}
                    className="p-2 text-gray-400 hover:text-gray-300"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
          >
            {action ? 'Update' : 'Create'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewActionModal;
