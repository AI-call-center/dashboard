import {
  UserGroupIcon,
  PhoneIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

export type CallDirection = 'inbound' | 'outbound' | 'both';
export type AgentCategory = 'sales' | 'support' | 'operations' | 'specialized';

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: AgentCategory;
  direction: CallDirection;
  capabilities: string[];
  setupTime: string;
  popularity: number;
  defaultPrompt: string;
  defaultGreeting: string;
  defaultTools: string[];
}

export const categoryColors = {
  sales: 'text-blue-400',
  support: 'text-green-400',
  operations: 'text-purple-400',
  specialized: 'text-orange-400',
};

export const directionLabels = {
  inbound: 'Inbound Calls',
  outbound: 'Outbound Calls',
  both: 'Inbound & Outbound',
};

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'sales-agent',
    category: 'sales',
    direction: 'both',
    name: 'Sales Agent',
    description: 'Qualifies leads and books sales meetings',
    icon: UserGroupIcon,
    capabilities: [
      'Qualifies sales leads',
      'Books meetings with prospects',
      'Answers product questions',
      'Handles pricing inquiries',
    ],
    setupTime: '2 min',
    popularity: 85,
    defaultPrompt: 'You are a professional sales agent focused on qualifying leads and booking meetings. Be friendly but direct, and always try to move the conversation towards booking a meeting when appropriate.',
    defaultGreeting: 'Hi there! I\'m here to help you learn more about our products and services. What brings you here today?',
    defaultTools: ['appointment-scheduling', 'call-transfer'],
  },
  {
    id: 'customer-service',
    category: 'support',
    direction: 'inbound',
    name: 'Customer Service',
    description: 'Handles support and service inquiries',
    icon: PhoneIcon,
    capabilities: [
      'Answers common questions',
      'Resolves basic issues',
      'Collects customer feedback',
      'Escalates complex issues',
    ],
    setupTime: '2 min',
    popularity: 92,
    defaultPrompt: 'You are a helpful customer service representative. Focus on resolving customer issues efficiently while maintaining a friendly and professional tone.',
    defaultGreeting: 'Hello! I\'m your customer service assistant. How can I help you today?',
    defaultTools: ['call-transfer', 'end-call'],
  },
  {
    id: 'appointment-scheduler',
    name: 'Appointment Scheduler',
    description: 'Books and manages appointments',
    icon: CalendarDaysIcon,
    capabilities: [
      'Schedules appointments',
      'Sends confirmations',
      'Handles rescheduling',
      'Manages cancellations',
    ],
    setupTime: '2 min',
    popularity: 78,
    defaultPrompt: 'You are an appointment scheduling specialist. Help customers book, reschedule, or cancel appointments efficiently while maintaining a professional and organized approach.',
    defaultGreeting: 'Hi! I\'m here to help you schedule an appointment. When would you like to book?',
    defaultTools: ['appointment-scheduling', 'end-call'],
    category: 'operations',
    direction: 'both',
  },
  {
    id: 'faq-assistant',
    name: 'FAQ Assistant',
    description: 'Answers common questions',
    icon: QuestionMarkCircleIcon,
    capabilities: [
      'Answers FAQs',
      'Provides documentation',
      'Explains processes',
      'Guides users',
    ],
    setupTime: '2 min',
    popularity: 75,
    defaultPrompt: 'You are a knowledgeable FAQ assistant. Provide clear and concise answers to questions while being helpful and patient.',
    defaultGreeting: 'Welcome! I\'m your FAQ assistant. What question can I help you with?',
    defaultTools: ['end-call'],
    category: 'support',
    direction: 'inbound',
  },
  {
    id: 'real-estate',
    category: 'specialized',
    direction: 'both',
    name: 'Real Estate Agent',
    description: 'Handles property inquiries',
    icon: BuildingOfficeIcon,
    capabilities: [
      'Qualifies buyers/renters',
      'Schedules viewings',
      'Answers property questions',
      'Collects requirements',
    ],
    setupTime: '2 min',
    popularity: 70,
    defaultPrompt: 'You are a professional real estate agent. Help clients find properties that match their needs and schedule viewings when appropriate.',
    defaultGreeting: 'Hello! I\'m here to help you find your perfect property. What type of property are you looking for?',
    defaultTools: ['appointment-scheduling', 'call-transfer'],
  },
  {
    id: 'order-support',
    category: 'support',
    direction: 'inbound',
    name: 'Order Support',
    description: 'Handles order-related inquiries',
    icon: ShoppingCartIcon,
    capabilities: [
      'Tracks orders',
      'Handles returns',
      'Processes refunds',
      'Updates shipping',
    ],
    setupTime: '2 min',
    popularity: 88,
    defaultPrompt: 'You are an order support specialist. Help customers with their order-related inquiries efficiently while maintaining a helpful and solution-oriented approach.',
    defaultGreeting: 'Hi! I\'m here to help with your order. Do you have your order number handy?',
    defaultTools: ['call-transfer', 'end-call'],
  },
];
