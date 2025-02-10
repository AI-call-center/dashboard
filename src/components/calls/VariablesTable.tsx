import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const VariablesTable = () => {
  // Mock data - replace with actual data
  const inputVariables = [
    { name: 'city', value: 'New York' },
    { name: 'customer_name', value: 'John Doe' },
    { name: 'product_interest', value: 'Health Insurance' },
  ];

  const extractedVariables = [
    { name: 'status', value: 'Completed' },
    { name: 'summary', value: 'Scheduled a meeting with an expert agent' },
    { name: 'follow_up_required', value: 'Yes' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Variables */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Input Variables</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray-400 font-medium">Name</th>
                <th className="text-left py-3 text-gray-400 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {inputVariables.map((variable, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700/50 last:border-0"
                >
                  <td className="py-3 font-mono text-sm text-blue-400">
                    {variable.name}
                  </td>
                  <td className="py-3">{variable.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Extracted Variables */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Extracted Variables</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Re-evaluate
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray-400 font-medium">Name</th>
                <th className="text-left py-3 text-gray-400 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {extractedVariables.map((variable, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700/50 last:border-0"
                >
                  <td className="py-3 font-mono text-sm text-purple-400">
                    {variable.name}
                  </td>
                  <td className="py-3">{variable.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default VariablesTable;
