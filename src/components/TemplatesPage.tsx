import { motion } from 'framer-motion';
import {
  PlusIcon,
  BeakerIcon,
  BuildingOfficeIcon,
  HeartIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const agentTemplates = [
  {
    id: 'create-own',
    type: 'create',
    title: 'Create Your Own AI Agent',
    description: 'Create your own AI agent from scratch, tailored to your business, your products, your knowledge, your goals, etc.',
    icon: PlusIcon,
    tag: 'custom',
    primary: true,
  },
  {
    id: 'healthcare',
    type: 'template',
    title: 'Healthcare Practice',
    description: 'Perfect for medical practices, clinics, and healthcare providers. Handles appointment scheduling and patient inquiries.',
    icon: HeartIcon,
    tag: 'health-care',
  },
  {
    id: 'retail',
    type: 'template',
    title: 'Retail Assistant',
    description: 'Ideal for retail businesses. Handles product inquiries, order status, and customer support.',
    icon: ShoppingBagIcon,
    tag: 'retail',
  },
  {
    id: 'education',
    type: 'template',
    title: 'Education Support',
    description: 'Designed for educational institutions. Manages student inquiries and administrative tasks.',
    icon: AcademicCapIcon,
    tag: 'education',
  },
  {
    id: 'real-estate',
    type: 'template',
    title: 'Real Estate Agent',
    description: 'Perfect for real estate agencies. Handles property inquiries and scheduling viewings.',
    icon: BuildingOfficeIcon,
    tag: 'real-estate',
  },
  {
    id: 'corporate',
    type: 'template',
    title: 'Corporate Support',
    description: 'Ideal for businesses. Manages customer service, sales inquiries, and support tickets.',
    icon: BriefcaseIcon,
    tag: 'corporate',
  },
  {
    id: 'lab-assistant',
    type: 'template',
    title: 'Lab Assistant',
    description: 'Perfect for research labs and testing facilities. Manages schedules and equipment tracking.',
    icon: BeakerIcon,
    tag: 'laboratory',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const AgentsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black">
      <div className="max-w-7xl mx-auto space-y-8 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-bold text-white">
              Agent Templates
            </h1>
            <p className="text-gray-400">
              Choose a template or create your own AI agent
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full md:w-64"
          >
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </motion.div>
        </div>

        {/* Templates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {agentTemplates.map((template) => (
            <motion.div
              key={template.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 rounded-xl border ${
                template.primary
                  ? 'bg-gradient-to-br from-dashboard-accent/20 to-dashboard-secondary/20 border-dashboard-accent/50 animate-glow'
                  : 'bg-dashboard-surface border-gray-800'
              } group`}
            >
              {/* Card Content */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <template.icon
                    className={`w-8 h-8 ${
                      template.primary ? 'text-dashboard-accent' : 'text-gray-400'
                    } group-hover:text-dashboard-accent transition-colors`}
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      template.primary
                        ? 'bg-dashboard-accent/20 text-dashboard-accent'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {template.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {template.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {template.description}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    template.primary
                      ? 'bg-dashboard-accent text-white'
                      : 'bg-gray-800 text-gray-300'
                  } hover:bg-dashboard-accent hover:text-white transition-colors group`}
                >
                  <span>
                    {template.type === 'create' ? 'Get Started' : 'Use this Template'}
                  </span>
                  <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-dashboard-accent/0 to-dashboard-secondary/0 group-hover:from-dashboard-accent/5 group-hover:to-dashboard-secondary/5 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AgentsPage;
