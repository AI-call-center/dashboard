import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import {
  XMarkIcon,
  CheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  includedMinutes: number;
  extraMinutePrice: number;
  assistants: string;
  outboundCampaigns: string;
  parallelCalls: number;
  clonedVoices: string;
  automateRuns: string;
  whiteLabel?: boolean;
}

interface Subscription {
  id: string;
  planName: string;
  startDate: Date;
  nextBillingDate: Date;
  status: 'Active' | 'Cancelled';
}

interface Payment {
  id: string;
  date: Date;
  planName: string;
  amount: number;
  status: 'Paid' | 'Failed';
}

const plans: Plan[] = [
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 129,
    yearlyPrice: 1290,
    includedMinutes: 700,
    extraMinutePrice: 0.16,
    assistants: '5',
    outboundCampaigns: '5',
    parallelCalls: 10,
    clonedVoices: '5',
    automateRuns: '10,000',
    isPopular: true,
    features: [
      '700 included minutes',
      '$0.16 per extra minute',
      '5 assistants',
      '5 outbound campaigns',
      '10 calls in parallel',
      '5 cloned voices',
      '10,000 no-code automate platform runs monthly',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    monthlyPrice: 249,
    yearlyPrice: 2490,
    includedMinutes: 1700,
    extraMinutePrice: 0.09,
    assistants: 'Unlimited',
    outboundCampaigns: 'Unlimited',
    parallelCalls: 500,
    clonedVoices: '10',
    automateRuns: '100,000',
    features: [
      '1,700 included minutes',
      '$0.09 per extra minute',
      'Unlimited assistants',
      'Unlimited outbound campaigns',
      '500 calls in parallel',
      '10 cloned voices',
      '100,000 no-code automate platform runs monthly',
    ],
  },
  {
    id: 'whitelabel',
    name: 'Whitelabel',
    monthlyPrice: 419,
    yearlyPrice: 4190,
    includedMinutes: 3500,
    extraMinutePrice: 0.09,
    assistants: 'Unlimited',
    outboundCampaigns: 'Unlimited',
    parallelCalls: 1000,
    clonedVoices: 'Unlimited',
    automateRuns: 'Unlimited',
    whiteLabel: true,
    features: [
      '3,500 included minutes',
      '$0.09 per extra minute',
      'Unlimited assistants',
      'Unlimited outbound campaigns',
      '1,000 calls in parallel',
      'Unlimited cloned voices',
      'Unlimited no-code automate platform runs monthly',
      'White label (your own branding)',
    ],
  },
];

// Mock data
const subscriptions: Subscription[] = [
  {
    id: '1',
    planName: 'Free',
    startDate: new Date('2025-01-01'),
    nextBillingDate: new Date('2025-02-01'),
    status: 'Active',
  },
];

const payments: Payment[] = [
  {
    id: '1',
    date: new Date('2025-01-01'),
    planName: 'Free',
    amount: 0,
    status: 'Paid',
  },
];

const BillingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePurchase = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    // Implement purchase logic here
    toast.success('Purchase successful!');
    setShowConfirmModal(false);
    setSelectedPlan(null);
  };

  const calculateYearlySavings = (plan: Plan) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlyTotal = plan.yearlyPrice;
    const savings = monthlyTotal - yearlyTotal;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Billing
        </h1>
        <p className="text-gray-400 text-lg">
          You are on the Free plan. Upgrade to a paid plan to get more credits and
          features.
        </p>
      </div>

      {/* Plan Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-800/50 p-1 rounded-lg flex items-center gap-2">
          <Switch.Group>
            <div className="flex items-center gap-4">
              <Switch.Label className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
                Monthly
              </Switch.Label>
              <Switch
                checked={isYearly}
                onChange={setIsYearly}
                className={`${
                  isYearly ? 'bg-blue-500' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <Switch.Label className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                Yearly
              </Switch.Label>
            </div>
          </Switch.Group>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const { savings, percentage } = calculateYearlySavings(plan);
          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 rounded-xl border ${
                plan.isPopular
                  ? 'border-blue-500 bg-blue-500/5'
                  : 'border-gray-800 bg-gray-900'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <SparklesIcon className="w-4 h-4" />
                    POPULAR
                  </span>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-400">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && (
                    <div className="mt-1 text-sm text-green-400">
                      Save {percentage}% – ${savings} off
                    </div>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(plan)}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Purchase
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subscriptions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Subscriptions</h2>
        {subscriptions.length > 0 ? (
          <div className="relative overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">Next Billing</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{subscription.planName}</td>
                    <td className="px-6 py-4">
                      {format(subscription.startDate, 'EEE MMM dd yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      {format(subscription.nextBillingDate, 'EEE MMM dd yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.status === 'Active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No subscriptions! Explore plans above to get started.
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Payment History</h2>
        {payments.length > 0 ? (
          <div className="relative overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {format(payment.date, 'EEE MMM dd yyyy')}
                    </td>
                    <td className="px-6 py-4">{payment.planName}</td>
                    <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'Paid'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No payment history available.
          </div>
        )}
      </div>

      {/* Purchase Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && selectedPlan && (
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
                  Confirm Purchase
                </h2>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4 py-4">
                <div className="flex justify-between text-gray-300">
                  <span>Plan:</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Billing:</span>
                  <span>{isYearly ? 'Yearly' : 'Monthly'}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Price:</span>
                  <div className="text-right">
                    <div>
                      ${isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}/
                      {isYearly ? 'year' : 'month'}
                    </div>
                    {isYearly && (
                      <div className="text-sm text-green-400">
                        Save {calculateYearlySavings(selectedPlan).percentage}% (${calculateYearlySavings(selectedPlan).savings} off)
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmPurchase}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BillingPage;
