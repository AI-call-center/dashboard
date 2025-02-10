import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  PlusIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import NewActionModal from './NewActionModal';

interface Action {
  id: string;
  name: string;
  description: string;
  type: 'Custom' | 'Zapier';
  createdAt: Date;
  lastUsed: Date | null;
}

const ActionsPage = () => {
  const [showNewActionModal, setShowNewActionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  // Mock data - replace with API calls
  const actions: Action[] = [
    {
      id: '1',
      name: 'Add customer query',
      description: 'Add a customer query to the database',
      type: 'Custom',
      createdAt: new Date('2025-01-15'),
      lastUsed: new Date('2025-02-01'),
    },
    {
      id: '2',
      name: 'Update user status',
      description: 'Update the status of a user in the CRM',
      type: 'Custom',
      createdAt: new Date('2025-01-20'),
      lastUsed: null,
    },
  ];

  const handleDelete = () => {
    if (selectedAction) {
      // Implement delete logic here
      console.log('Deleting action:', selectedAction.name);
      toast.success('Action deleted successfully');
      setShowDeleteModal(false);
      setSelectedAction(null);
    }
  };

  const handleEdit = (action: Action) => {
    setSelectedAction(action);
    setShowNewActionModal(true);
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Actions
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Actions are the building blocks of your workflows. They are used to
            integrate with external APIs and services. The agents will use these
            actions to perform their tasks.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewActionModal(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          New Action
        </motion.button>
      </div>

      {/* Actions List */}
      {actions.length > 0 ? (
        <div className="relative overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
              <tr>
                <th className="px-6 py-4">Action Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4">Last Used</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {actions.map((action) => (
                <motion.tr
                  key={action.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{action.name}</td>
                  <td className="px-6 py-4">{action.description}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        action.type === 'Custom'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {action.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {format(action.createdAt, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    {action.lastUsed
                      ? format(action.lastUsed, 'MMM dd, yyyy')
                      : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-700 rounded-lg"
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </motion.button>
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded-t-lg flex items-center gap-2 text-gray-300 hover:text-white"
                          onClick={() => handleEdit(action)}
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded-b-lg flex items-center gap-2 text-red-400 hover:text-red-300"
                          onClick={() => {
                            setSelectedAction(action);
                            setShowDeleteModal(true);
                          }}
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-xl font-medium text-gray-300">Start adding actions</p>
          <p className="text-gray-400 text-center max-w-md">
            Actions are the building blocks of your workflows. They are used to
            integrate with external APIs and services. The agents will use these
            actions to perform their tasks.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewActionModal(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            New Action
          </motion.button>
        </div>
      )}

      {/* New Action Modal */}
      <AnimatePresence>
        {showNewActionModal && (
          <NewActionModal
            action={selectedAction}
            onClose={() => {
              setShowNewActionModal(false);
              setSelectedAction(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 max-w-md w-full space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-100">
                  Delete Action
                </h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-300">
                Are you sure you want to delete the action{' '}
                <span className="font-medium">{selectedAction.name}</span>? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionsPage;
