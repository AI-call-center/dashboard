import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const CallTranscript = () => {
  // Mock transcript data - replace with actual data
  const transcript = [
    {
      id: 1,
      speaker: 'Assistant',
      text: 'Hello! This is Sarah from ABC Insurance. How are you today?',
      timestamp: '00:00.5',
    },
    {
      id: 2,
      speaker: 'Client',
      text: "Hi Sarah, I'm doing well, thank you. I received your email about the new insurance plans.",
      timestamp: '00:04.2',
    },
    {
      id: 3,
      speaker: 'Assistant',
      text: "That's great! I'd be happy to walk you through our new coverage options. What type of insurance are you most interested in?",
      timestamp: '00:09.8',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Transcript</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition-colors text-sm font-medium"
        >
          Live Chat
        </motion.button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {transcript.map((message) => (
          <motion.div
            key={message.id}
            variants={itemVariants}
            className={`flex gap-4 ${
              message.speaker === 'Client' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.speaker === 'Assistant'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-purple-500/20 text-purple-400'
              }`}
            >
              {message.speaker === 'Assistant' ? (
                <ChatBubbleLeftIcon className="w-5 h-5" />
              ) : (
                <UserCircleIcon className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div
                className={`relative p-4 rounded-2xl ${
                  message.speaker === 'Assistant'
                    ? 'bg-blue-500/10 border border-blue-500/20'
                    : 'bg-purple-500/10 border border-purple-500/20'
                }`}
              >
                <div
                  className={`absolute top-0 ${
                    message.speaker === 'Assistant'
                      ? '-left-2 w-4 h-8 bg-gradient-to-r'
                      : '-right-2 w-4 h-8 bg-gradient-to-l'
                  } from-transparent to-blue-500/5 blur-xl`}
                />
                {message.text}
              </div>
              <div className="text-sm text-gray-500 px-4">
                {message.timestamp}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CallTranscript;
