import { motion } from 'framer-motion';
import { PhoneIcon, ArrowDownTrayIcon, PlayIcon, PauseIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import AudioWaveform from './AudioWaveform';
import CallTranscript from './CallTranscript';
import VariablesTable from './VariablesTable';
import WebhookSection from './WebhookSection';

interface ViewCallPageProps {
  callId: string;
  onBack?: () => void;
}

const ViewCallPage = ({ callId, onBack }: ViewCallPageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Mock data - replace with actual API calls
  console.log('Viewing call:', callId);
  const callData = {
    type: 'Outbound',
    status: 'Completed',
    cost: '$0.83',
    answeredBy: 'Human',
    duration: '1m 21s',
    clientPhone: '+1 (555) 123-4567',
    assistantName: 'Sarah Wilson',
    assistantPhone: '+1 (555) 987-6543',
    campaign: 'Summer Outreach 2025',
    leadId: 'LEAD-123456',
    timestamp: '2025-02-10 13:45:23',
    totalDuration: 81, // in seconds
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 border-b border-gray-800"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Calls
          </motion.button>
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
          View Call
        </h1>
        <p className="text-gray-400">
          Detailed view of the call between the client and the assistant.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Audio Player Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
        >
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-white" />
              ) : (
                <PlayIcon className="w-6 h-6 text-white" />
              )}
            </motion.button>
            <div className="flex-1">
              <AudioWaveform
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={callData.totalDuration}
                onTimeUpdate={setCurrentTime}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download
            </motion.button>
          </div>
        </motion.div>

        {/* Call Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Call Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Type</div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5 text-blue-500" />
                  {callData.type}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="flex items-center gap-2">
                  {callData.status === 'Completed' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                  <span className={callData.status === 'Completed' ? 'text-green-500' : 'text-red-500'}>
                    {callData.status}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Cost</div>
                <div>{callData.cost}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Answered By</div>
                <div>{callData.answeredBy}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Duration</div>
                <div>{callData.duration}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Client Phone</div>
                <div>{callData.clientPhone}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Assistant Info</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400">Assistant Name</div>
                <div className="text-blue-400 hover:text-blue-300 cursor-pointer">
                  {callData.assistantName}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Assistant Phone</div>
                <div>{callData.assistantPhone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Campaign</div>
                <div className="text-blue-400 hover:text-blue-300 cursor-pointer">
                  {callData.campaign}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Lead ID</div>
                <div>{callData.leadId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Timestamp</div>
                <div>{callData.timestamp}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Variables and Transcript Sections */}
        <VariablesTable />
        <CallTranscript />
        <WebhookSection />
      </div>
    </div>
  );
};

export default ViewCallPage;
