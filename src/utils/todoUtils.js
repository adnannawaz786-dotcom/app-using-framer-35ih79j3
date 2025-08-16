// Todo management utilities
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';

// Todo priorities
export const TODO_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Todo categories
export const TODO_CATEGORIES = {
  WORK: 'work',
  PERSONAL: 'personal',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  LEARNING: 'learning',
  OTHER: 'other'
};

// Todo status
export const TODO_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Generate unique ID for todos
export const generateTodoId = () => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create a new todo object
export const createTodo = (text, options = {}) => {
  const {
    priority = TODO_PRIORITIES.MEDIUM,
    category = TODO_CATEGORIES.OTHER,
    dueDate = null,
    description = '',
    tags = []
  } = options;

  return {
    id: generateTodoId(),
    text: text.trim(),
    description: description.trim(),
    completed: false,
    status: TODO_STATUS.PENDING,
    priority,
    category,
    tags: Array.isArray(tags) ? tags : [],
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  };
};

// Update todo
export const updateTodo = (todo, updates) => {
  return {
    ...todo,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

// Toggle todo completion
export const toggleTodoCompletion = (todo) => {
  const isCompleting = !todo.completed;
  return {
    ...todo,
    completed: isCompleting,
    status: isCompleting ? TODO_STATUS.COMPLETED : TODO_STATUS.PENDING,
    completedAt: isCompleting ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString()
  };
};

// Filter todos by status
export const filterTodosByStatus = (todos, status) => {
  return todos.filter(todo => todo.status === status);
};

// Filter todos by category
export const filterTodosByCategory = (todos, category) => {
  return todos.filter(todo => todo.category === category);
};

// Filter todos by priority
export const filterTodosByPriority = (todos, priority) => {
  return todos.filter(todo => todo.priority === priority);
};

// Filter completed todos
export const getCompletedTodos = (todos) => {
  return todos.filter(todo => todo.completed);
};

// Filter pending todos
export const getPendingTodos = (todos) => {
  return todos.filter(todo => !todo.completed);
};

// Search todos by text
export const searchTodos = (todos, searchTerm) => {
  if (!searchTerm.trim()) return todos;
  
  const term = searchTerm.toLowerCase().trim();
  return todos.filter(todo => 
    todo.text.toLowerCase().includes(term) ||
    todo.description.toLowerCase().includes(term) ||
    todo.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Sort todos by creation date
export const sortTodosByDate = (todos, ascending = false) => {
  return [...todos].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Sort todos by priority
export const sortTodosByPriority = (todos) => {
  const priorityOrder = {
    [TODO_PRIORITIES.URGENT]: 4,
    [TODO_PRIORITIES.HIGH]: 3,
    [TODO_PRIORITIES.MEDIUM]: 2,
    [TODO_PRIORITIES.LOW]: 1
  };

  return [...todos].sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

// Sort todos by due date
export const sortTodosByDueDate = (todos) => {
  return [...todos].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};

// Get overdue todos
export const getOverdueTodos = (todos) => {
  const now = new Date();
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < now;
  });
};

// Get todos due today
export const getTodayTodos = (todos) => {
  return todos.filter(todo => {
    if (!todo.dueDate) return false;
    return isToday(new Date(todo.dueDate));
  });
};

// Get todos due tomorrow
export const getTomorrowTodos = (todos) => {
  return todos.filter(todo => {
    if (!todo.dueDate) return false;
    return isTomorrow(new Date(todo.dueDate));
  });
};

// Format due date for display
export const formatDueDate = (dueDate) => {
  if (!dueDate) return '';
  
  const date = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  
  return format(date, 'MMM dd, yyyy');
};

// Get priority color class
export const getPriorityColor = (priority) => {
  switch (priority) {
    case TODO_PRIORITIES.URGENT:
      return 'bg-red-500 border-red-600 text-red-50';
    case TODO_PRIORITIES.HIGH:
      return 'bg-orange-500 border-orange-600 text-orange-50';
    case TODO_PRIORITIES.MEDIUM:
      return 'bg-yellow-500 border-yellow-600 text-yellow-50';
    case TODO_PRIORITIES.LOW:
      return 'bg-green-500 border-green-600 text-green-50';
    default:
      return 'bg-gray-500 border-gray-600 text-gray-50';
  }
};

// Get category color class
export const getCategoryColor = (category) => {
  switch (category) {
    case TODO_CATEGORIES.WORK:
      return 'bg-blue-500 border-blue-600 text-blue-50';
    case TODO_CATEGORIES.PERSONAL:
      return 'bg-purple-500 border-purple-600 text-purple-50';
    case TODO_CATEGORIES.SHOPPING:
      return 'bg-pink-500 border-pink-600 text-pink-50';
    case TODO_CATEGORIES.HEALTH:
      return 'bg-emerald-500 border-emerald-600 text-emerald-50';
    case TODO_CATEGORIES.LEARNING:
      return 'bg-indigo-500 border-indigo-600 text-indigo-50';
    default:
      return 'bg-gray-500 border-gray-600 text-gray-50';
  }
};

// Calculate completion percentage
export const getCompletionPercentage = (todos) => {
  if (todos.length === 0) return 0;
  const completed = getCompletedTodos(todos).length;
  return Math.round((completed / todos.length) * 100);
};

// Get todos statistics
export const getTodosStats = (todos) => {
  const total = todos.length;
  const completed = getCompletedTodos(todos).length;
  const pending = getPendingTodos(todos).length;
  const overdue = getOverdueTodos(todos).length;
  const today = getTodayTodos(todos).length;
  
  return {
    total,
    completed,
    pending,
    overdue,
    today,
    completionRate: getCompletionPercentage(todos)
  };
};

// Validate todo data
export const validateTodo = (todoData) => {
  const errors = {};
  
  if (!todoData.text || !todoData.text.trim()) {
    errors.text = 'Todo text is required';
  }
  
  if (todoData.text && todoData.text.trim().length > 200) {
    errors.text = 'Todo text must be less than 200 characters';
  }
  
  if (todoData.description && todoData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  if (todoData.priority && !Object.values(TODO_PRIORITIES).includes(todoData.priority)) {
    errors.priority = 'Invalid priority value';
  }
  
  if (todoData.category && !Object.values(TODO_CATEGORIES).includes(todoData.category)) {
    errors.category = 'Invalid category value';
  }
  
  if (todoData.dueDate) {
    const dueDate = new Date(todoData.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Invalid due date';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Export all utilities as default
export default {
  TODO_PRIORITIES,
  TODO_CATEGORIES,
  TODO_STATUS,
  generateTodoId,
  createTodo,
  updateTodo,
  toggleTodoCompletion,
  filterTodosByStatus,
  filterTodosByCategory,
  filterTodosByPriority,
  getCompletedTodos,
  getPendingTodos,
  searchTodos,
  sortTodosByDate,
  sortTodosByPriority,
  sortTodosByDueDate,
  getOverdueTodos,
  getTodayTodos,
  getTomorrowTodos,
  formatDueDate,
  getPriorityColor,
  getCategoryColor,
  getCompletionPercentage,
  getTodosStats,
  validateTodo
};