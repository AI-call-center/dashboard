import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PhoneIcon,
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,

} from '@heroicons/react/24/outline';
import { Switch, RadioGroup } from '@headlessui/react';

interface PhoneNumber {
  id: string;
  number: string;
  type: 'Local' | 'Toll-Free' | 'Mobile';
  voiceEnabled: boolean;
  smsEnabled: boolean;
  addressRequired: boolean;
  price: number;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

const BuyPhonePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
  });
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedType, setSelectedType] = useState<'Local' | 'Toll-Free' | 'Mobile'>('Local');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);

  // Mock data - replace with API calls
  const countries: Country[] = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  ];

  const phoneNumbers: PhoneNumber[] = [
    {
      id: '1',
      number: '+19032897457',
      type: 'Local',
      voiceEnabled: true,
      smsEnabled: false,
      addressRequired: false,
      price: 1.15,
    },
    {
      id: '2',
      number: '+18002897458',
      type: 'Toll-Free',
      voiceEnabled: true,
      smsEnabled: true,
      addressRequired: true,
      price: 2.25,
    },
    {
      id: '3',
      number: '+19152897459',
      type: 'Mobile',
      voiceEnabled: true,
      smsEnabled: true,
      addressRequired: false,
      price: 1.75,
    },
  ];

  const filteredNumbers = phoneNumbers.filter(
    (number) =>
      number.number.includes(searchQuery) &&
      (selectedType === number.type) &&
      (!voiceEnabled || number.voiceEnabled)
  );

  const handleBuy = (number: PhoneNumber) => {
    setSelectedNumber(number);
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    // Implement purchase logic
    console.log('Purchasing number:', selectedNumber?.number);
    setShowConfirmModal(false);
    setSelectedNumber(null);
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Buy Phone Number
        </h1>
        <p className="text-gray-400">
          Select a phone number that suits your needs.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Country Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <select
            value={selectedCountry.code}
            onChange={(e) =>
              setSelectedCountry(
                countries.find((c) => c.code === e.target.value) || countries[0]
              )
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by digits or phrases"
              className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Voice Enabled Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Capabilities
          </label>
          <Switch.Group>
            <div className="flex items-center">
              <Switch
                checked={voiceEnabled}
                onChange={setVoiceEnabled}
                className={`${
                  voiceEnabled ? 'bg-blue-500' : 'bg-gray-700'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <Switch.Label className="ml-3 text-sm text-gray-300">
                Voice Enabled
              </Switch.Label>
            </div>
          </Switch.Group>
        </div>

        {/* Number Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number Type
          </label>
          <RadioGroup value={selectedType} onChange={setSelectedType}>
            <div className="flex gap-4">
              {['Local', 'Toll-Free', 'Mobile'].map((type) => (
                <RadioGroup.Option
                  key={type}
                  value={type}
                  className={({ checked }) =>
                    `${
                      checked
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300'
                    } px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors`
                  }
                >
                  {type}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Phone Numbers Table */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
            <tr>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Capabilities</th>
              <th className="px-6 py-4">Address Required</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredNumbers.length > 0 ? (
              filteredNumbers.map((number) => (
                <motion.tr
                  key={number.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{number.number}</td>
                  <td className="px-6 py-4">{number.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <PhoneIcon
                          className={`w-5 h-5 ${
                            number.voiceEnabled
                              ? 'text-green-500'
                              : 'text-gray-500'
                          }`}
                        />
                        <span className="text-xs">Voice</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChatBubbleBottomCenterIcon
                          className={`w-5 h-5 ${
                            number.smsEnabled
                              ? 'text-green-500'
                              : 'text-gray-500'
                          }`}
                        />
                        <span className="text-xs">SMS</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <MapPinIcon
                        className={`w-5 h-5 ${
                          number.addressRequired
                            ? 'text-yellow-500'
                            : 'text-gray-500'
                        }`}
                      />
                      {number.addressRequired ? 'Required' : 'None'}
                    </div>
                  </td>
                  <td className="px-6 py-4">{number.price.toFixed(2)} USD</td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBuy(number)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                    >
                      Buy
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No numbers available. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="text-sm text-gray-400">
          Showing 1-{filteredNumbers.length} of {filteredNumbers.length} results
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </motion.button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of 1
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={true}
            className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && selectedNumber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
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
                  <span>Phone Number:</span>
                  <span className="font-medium">{selectedNumber.number}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Type:</span>
                  <span>{selectedNumber.type}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Price:</span>
                  <span>{selectedNumber.price.toFixed(2)} USD</span>
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

export default BuyPhonePage;
