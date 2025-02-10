import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const WebhookSection = () => {
  // Mock data - replace with actual data
  const webhookResponse = {
    status: 'success',
    timestamp: '2025-02-10 13:45:24',
    response: {
      id: 'webhook-123',
      status: 200,
      message: 'Successfully processed call data',
      data: {
        call_id: 'call-456',
        processed_at: '2025-02-10T13:45:24Z',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Webhook Details</h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
            <CheckCircleIcon className="w-4 h-4" />
            Webhook Sent
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Re-send Webhook
        </motion.button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-400 mb-2">Response</div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur" />
            <pre className="relative bg-gray-900/50 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              {JSON.stringify(webhookResponse, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WebhookSection;
