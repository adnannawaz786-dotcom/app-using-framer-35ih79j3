import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Check, Plus, X } from 'lucide-react'

const TodoList = ({ todos, onToggle, onDelete, onAdd }) => {
  const [newTodo, setNewTodo] = React.useState('')
  const [isAdding, setIsAdding] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      onAdd(newTodo.trim())
      setNewTodo('')
      setIsAdding(false)
    }
  }

  const handleCancel = () => {
    setNewTodo('')
    setIsAdding(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Add Todo Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {!isAdding ? (
          <motion.button
            onClick={() => setIsAdding(true)}
            className="w-full p-6 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] font-bold text-xl flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={24} />
            ADD NEW TASK
          </motion.button>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="WHAT NEEDS TO BE DONE?"
              className="w-full p-4 border-4 border-black font-bold text-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-0 mb-4"
              autoFocus
            />
            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="flex-1 p-3 bg-green-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] font-bold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check size={20} />
                ADD
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCancel}
                className="flex-1 p-3 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] font-bold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X size={20} />
                CANCEL
              </motion.button>
            </div>
          </motion.form>
        )}
      </motion.div>

      {/* Todo Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              className={`p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
                todo.completed
                  ? 'bg-gray-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <motion.button
                    onClick={() => onToggle(todo.id)}
                    className={`w-8 h-8 border-4 border-black flex items-center justify-center font-bold ${
                      todo.completed
                        ? 'bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {todo.completed && <Check size={16} />}
                  </motion.button>
                  
                  <motion.span
                    className={`text-lg font-bold flex-1 ${
                      todo.completed
                        ? 'line-through text-gray-600'
                        : 'text-black'
                    }`}
                    animate={{
                      opacity: todo.completed ? 0.6 : 1,
                      scale: todo.completed ? 0.95 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {todo.text}
                  </motion.span>
                </div>
                
                <motion.button
                  onClick={() => onDelete(todo.id)}
                  className="p-3 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {todos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center py-16"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            📝
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">NO TASKS YET!</h3>
          <p className="text-gray-600 font-medium">
            Add your first task to get started
          </p>
        </motion.div>
      )}

      {/* Stats */}
      {todos.length > 0 && (
        <motion.div
          className="mt-8 p-6 bg-blue-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center text-lg font-bold">
            <span>TOTAL TASKS: {todos.length}</span>
            <span>COMPLETED: {todos.filter(todo => todo.completed).length}</span>
            <span>REMAINING: {todos.filter(todo => !todo.completed).length}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-6 bg-white border-4 border-black">
              <motion.div
                className="h-full bg-green-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0}%`
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TodoList