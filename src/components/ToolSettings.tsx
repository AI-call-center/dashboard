import { motion } from 'framer-motion';
import { PhoneArrowUpRightIcon, CalendarDaysIcon, PhoneXMarkIcon } from '@heroicons/react/24/outline';

interface ToolSettingsProps {
  toolId: string;
  onSettingsChange: (settings: any) => void;
  settings: any;
  errors: Record<string, string>;
}

const countryOptions = [
  { code: '+1', label: 'United States (+1)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+81', label: 'Japan (+81)' },
  // Add more country codes as needed
];

const calendarIntegrations = [
  {
    id: 'google',
    name: 'Google Calendar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
  },
  {
    id: 'cal',
    name: 'Cal.com',
    logo: 'https://cal.com/logo.svg',
  },
  {
    id: 'calendly',
    name: 'Calendly',
    logo: 'https://assets.calendly.com/assets/frontend/media/logo-square-cd364a3c33976d32792a.png',
  },
];

const ToolSettings = ({ toolId, onSettingsChange, settings, errors }: ToolSettingsProps) => {
  const renderCallTransferSettings = () => (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Phone Number*</label>
        <p className="text-sm text-gray-400">
          Phone number of the real assistant to transfer the call to.
        </p>
        <div className="flex space-x-2">
          <select
            value={settings.countryCode || ''}
            onChange={(e) => 
              onSettingsChange({ ...settings, countryCode: e.target.value })
            }
            className="w-40 px-3 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
          >
            <option value="">Select Code</option>
            {countryOptions.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            value={settings.phoneNumber || ''}
            onChange={(e) => 
              onSettingsChange({ ...settings, phoneNumber: e.target.value })
            }
            placeholder="Enter phone number"
            className={`flex-1 px-4 py-2 bg-dashboard-surface border ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-700'
            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent`}
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">When to Transfer*</label>
        <textarea
          value={settings.transferCondition || ''}
          onChange={(e) => 
            onSettingsChange({ ...settings, transferCondition: e.target.value })
          }
          placeholder="Transfer the call when the customer asks for a real assistant."
          className={`w-full px-4 py-2 bg-dashboard-surface border ${
            errors.transferCondition ? 'border-red-500' : 'border-gray-700'
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent min-h-[100px]`}
        />
        {errors.transferCondition && (
          <p className="text-red-500 text-sm">{errors.transferCondition}</p>
        )}
      </div>
    </div>
  );

  const renderEndCallSettings = () => (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">When to End*</label>
        <textarea
          value={settings.endCondition || ''}
          onChange={(e) => 
            onSettingsChange({ ...settings, endCondition: e.target.value })
          }
          placeholder="End the call after saying goodbye to the customer."
          className={`w-full px-4 py-2 bg-dashboard-surface border ${
            errors.endCondition ? 'border-red-500' : 'border-gray-700'
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent min-h-[100px]`}
        />
        {errors.endCondition && (
          <p className="text-red-500 text-sm">{errors.endCondition}</p>
        )}
      </div>
    </div>
  );

  const renderAppointmentSettings = () => (
    <div className="space-y-6 mt-4">
      <div className="space-y-4">
        <h4 className="text-white font-medium">Calendar Integration</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {calendarIntegrations.map((integration) => (
            <motion.div
              key={integration.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => 
                onSettingsChange({ 
                  ...settings, 
                  calendarIntegration: integration.id 
                })
              }
              className={`p-4 bg-dashboard-surface border rounded-lg cursor-pointer transition-colors ${
                settings.calendarIntegration === integration.id
                  ? 'border-dashboard-accent bg-dashboard-accent/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-sm text-white font-medium">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {settings.calendarIntegration && (
        <div className="space-y-4">
          <h4 className="text-white font-medium">Integration Settings</h4>
          <div className="p-4 bg-dashboard-surface border border-gray-700 rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  API Key*
                </label>
                <input
                  type="password"
                  value={settings.apiKey || ''}
                  onChange={(e) => 
                    onSettingsChange({ ...settings, apiKey: e.target.value })
                  }
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Calendar ID
                </label>
                <input
                  type="text"
                  value={settings.calendarId || ''}
                  onChange={(e) => 
                    onSettingsChange({ ...settings, calendarId: e.target.value })
                  }
                  placeholder="Enter calendar ID (optional)"
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  switch (toolId) {
    case 'call-transfer':
      return renderCallTransferSettings();
    case 'end-call':
      return renderEndCallSettings();
    case 'appointment-scheduling':
      return renderAppointmentSettings();
    default:
      return null;
  }
};

export default ToolSettings;
