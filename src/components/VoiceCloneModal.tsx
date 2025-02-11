import { motion } from 'framer-motion';
import { useState } from 'react';
import { MicrophoneIcon, PauseIcon, StopIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface VoiceCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClone: (voiceName: string) => void;
}

const VoiceCloneModal = ({ isOpen, onClose, onClone }: VoiceCloneModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const sampleScript = `Hello! I'm excited to demonstrate my voice for this AI assistant role. 
I believe clear communication is key to providing excellent service. 
Let me share a bit about how I would interact with customers...`;

  const handleStartRecording = () => {
    setIsRecording(true);
    // Add actual recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingComplete(true);
    // Add actual recording stop logic here
  };

  const handleClone = async () => {
    setProcessing(true);
    // Simulate voice cloning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    onClone('Custom Voice ' + new Date().toISOString());
    onClose();
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
        className="bg-dashboard-surface border border-gray-800 rounded-xl p-6 max-w-lg w-full m-4 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white">Clone Voice</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Sample Script</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{sampleScript}</p>
          </div>

          <div className="flex justify-center">
            {!isRecording && !recordingComplete ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartRecording}
                className="bg-dashboard-accent text-white rounded-full p-4 hover:bg-blue-600 transition-colors"
              >
                <MicrophoneIcon className="w-8 h-8" />
              </motion.button>
            ) : isRecording ? (
              <div className="space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRecording(false)}
                  className="bg-yellow-500 text-white rounded-full p-4 hover:bg-yellow-600 transition-colors"
                >
                  <PauseIcon className="w-8 h-8" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStopRecording}
                  className="bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition-colors"
                >
                  <StopIcon className="w-8 h-8" />
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="text-green-400 font-medium">Recording Complete!</div>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRecordingComplete(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Record Again
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClone}
                    disabled={processing}
                    className="px-4 py-2 bg-dashboard-accent text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    {processing ? (
                      <>
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Clone Voice</span>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-400"
            >
              Recording... Speak the sample script clearly
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceCloneModal;
