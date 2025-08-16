// Todo Status Constants
export const TODO_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
  CANCELLED: 'cancelled'
};

// Todo Priority Constants
export const TODO_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Todo Category Constants
export const TODO_CATEGORIES = {
  PERSONAL: 'personal',
  WORK: 'work',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  EDUCATION: 'education',
  FINANCE: 'finance',
  TRAVEL: 'travel',
  HOME: 'home',
  OTHER: 'other'
};

// Animation Constants for Framer Motion
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  },
  item: {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  },
  form: {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  },
  button: {
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  },
  checkbox: {
    checked: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    },
    unchecked: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  }
};

// Neo Brutalism Color Scheme
export const BRUTALISM_COLORS = {
  primary: {
    bg: 'bg-yellow-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  secondary: {
    bg: 'bg-pink-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  success: {
    bg: 'bg-green-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  danger: {
    bg: 'bg-red-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  warning: {
    bg: 'bg-orange-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  info: {
    bg: 'bg-blue-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  neutral: {
    bg: 'bg-gray-200',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  }
};

// Priority Color Mapping
export const PRIORITY_COLORS = {
  [TODO_PRIORITIES.LOW]: BRUTALISM_COLORS.info,
  [TODO_PRIORITIES.MEDIUM]: BRUTALISM_COLORS.warning,
  [TODO_PRIORITIES.HIGH]: BRUTALISM_COLORS.danger,
  [TODO_PRIORITIES.URGENT]: {
    bg: 'bg-purple-400',
    border: 'border-black',
    text: 'text-white',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  }
};

// Category Color Mapping
export const CATEGORY_COLORS = {
  [TODO_CATEGORIES.PERSONAL]: BRUTALISM_COLORS.primary,
  [TODO_CATEGORIES.WORK]: BRUTALISM_COLORS.info,
  [TODO_CATEGORIES.SHOPPING]: BRUTALISM_COLORS.secondary,
  [TODO_CATEGORIES.HEALTH]: BRUTALISM_COLORS.success,
  [TODO_CATEGORIES.EDUCATION]: {
    bg: 'bg-indigo-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  [TODO_CATEGORIES.FINANCE]: {
    bg: 'bg-emerald-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  [TODO_CATEGORIES.TRAVEL]: {
    bg: 'bg-cyan-300',
    border: 'border-black',
    text: 'text-black',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  [TODO_CATEGORIES.HOME]: BRUTALISM_COLORS.warning,
  [TODO_CATEGORIES.OTHER]: BRUTALISM_COLORS.neutral
};

// Status Color Mapping
export const STATUS_COLORS = {
  [TODO_STATUS.PENDING]: BRUTALISM_COLORS.warning,
  [TODO_STATUS.COMPLETED]: BRUTALISM_COLORS.success,
  [TODO_STATUS.IN_PROGRESS]: BRUTALISM_COLORS.info,
  [TODO_STATUS.CANCELLED]: BRUTALISM_COLORS.neutral
};

// Form Validation Constants
export const VALIDATION_RULES = {
  title: {
    required: 'Title is required',
    minLength: {
      value: 3,
      message: 'Title must be at least 3 characters'
    },
    maxLength: {
      value: 100,
      message: 'Title must not exceed 100 characters'
    }
  },
  description: {
    maxLength: {
      value: 500,
      message: 'Description must not exceed 500 characters'
    }
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TODOS: 'brutalism_todos',
  FILTERS: 'brutalism_todo_filters',
  PREFERENCES: 'brutalism_todo_preferences'
};

// Filter Options
export const FILTER_OPTIONS = {
  status: [
    { value: 'all', label: 'All Tasks' },
    { value: TODO_STATUS.PENDING, label: 'Pending' },
    { value: TODO_STATUS.COMPLETED, label: 'Completed' },
    { value: TODO_STATUS.IN_PROGRESS, label: 'In Progress' },
    { value: TODO_STATUS.CANCELLED, label: 'Cancelled' }
  ],
  priority: [
    { value: 'all', label: 'All Priorities' },
    { value: TODO_PRIORITIES.LOW, label: 'Low' },
    { value: TODO_PRIORITIES.MEDIUM, label: 'Medium' },
    { value: TODO_PRIORITIES.HIGH, label: 'High' },
    { value: TODO_PRIORITIES.URGENT, label: 'Urgent' }
  ],
  category: [
    { value: 'all', label: 'All Categories' },
    { value: TODO_CATEGORIES.PERSONAL, label: 'Personal' },
    { value: TODO_CATEGORIES.WORK, label: 'Work' },
    { value: TODO_CATEGORIES.SHOPPING, label: 'Shopping' },
    { value: TODO_CATEGORIES.HEALTH, label: 'Health' },
    { value: TODO_CATEGORIES.EDUCATION, label: 'Education' },
    { value: TODO_CATEGORIES.FINANCE, label: 'Finance' },
    { value: TODO_CATEGORIES.TRAVEL, label: 'Travel' },
    { value: TODO_CATEGORIES.HOME, label: 'Home' },
    { value: TODO_CATEGORIES.OTHER, label: 'Other' }
  ]
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest First' },
  { value: 'date_asc', label: 'Oldest First' },
  { value: 'priority_desc', label: 'High Priority First' },
  { value: 'priority_asc', label: 'Low Priority First' },
  { value: 'due_date_asc', label: 'Due Date (Earliest)' },
  { value: 'due_date_desc', label: 'Due Date (Latest)' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' }
];

// Default Todo Values
export const DEFAULT_TODO = {
  title: '',
  description: '',
  priority: TODO_PRIORITIES.MEDIUM,
  category: TODO_CATEGORIES.PERSONAL,
  status: TODO_STATUS.PENDING,
  completed: false,
  dueDate: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// App Configuration
export const APP_CONFIG = {
  name: 'Brutal Todo',
  version: '1.0.0',
  maxTodos: 1000,
  autoSave: true,
  defaultView: 'list',
  theme: 'brutalism'
};