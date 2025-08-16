import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, X, Edit3 } from 'lucide-react'

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([todo, ...todos])
      setNewTodo('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEditing = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="min-h-screen bg-yellow-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black text-white p-6 border-8 border-black shadow-[12px_12px_0px_0px_#000] mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider">
            TODO APP
          </h1>
          <p className="text-xl mt-2 font-bold">GET STUFF DONE!</p>
        </motion.div>

        {/* Add Todo Form */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_#000] mb-8"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 text-xl font-bold border-4 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTodo}
              className="bg-green-400 hover:bg-green-500 px-6 py-3 border-4 border-black font-black text-xl shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-blue-400 p-4 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
            <div className="text-3xl font-black">{todos.length}</div>
            <div className="text-lg font-bold uppercase">Total</div>
          </div>
          <div className="bg-orange-400 p-4 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
            <div className="text-3xl font-black">{activeCount}</div>
            <div className="text-lg font-bold uppercase">Active</div>
          </div>
          <div className="bg-green-400 p-4 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
            <div className="text-3xl font-black">{completedCount}</div>
            <div className="text-lg font-bold uppercase">Done</div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex gap-4 mb-8 flex-wrap"
        >
          {['all', 'active', 'completed'].map((filterType) => (
            <motion.button
              key={filterType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 border-4 border-black font-black text-lg uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all ${
                filter === filterType
                  ? 'bg-pink-400'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {filterType}
            </motion.button>
          ))}
        </motion.div>

        {/* Todo List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 border-8 border-black shadow-[8px_8px_0px_0px_#000] ${
                  todo.completed
                    ? 'bg-gray-200 opacity-75'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-8 h-8 border-4 border-black flex items-center justify-center font-black ${
                      todo.completed
                        ? 'bg-green-400'
                        : 'bg-white hover:bg-green-100'
                    }`}
                  >
                    {todo.completed && <Check className="w-5 h-5" />}
                  </motion.button>

                  {editingId === todo.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        className="flex-1 px-3 py-2 text-lg font-bold border-4 border-black focus:outline-none"
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveEdit}
                        className="bg-green-400 hover:bg-green-500 px-3 py-2 border-4 border-black font-black"
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelEdit}
                        className="bg-red-400 hover:bg-red-500 px-3 py-2 border-4 border-black font-black"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex-1 text-lg font-bold ${
                          todo.completed
                            ? 'line-through text-gray-600'
                            : 'text-black'
                        }`}
                      >
                        {todo.text}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="bg-blue-400 hover:bg-blue-500 px-3 py-2 border-4 border-black font-black"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-400 hover:bg-red-500 px-3 py-2 border-4 border-black font-black"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTodos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white p-8 border-8 border-black shadow-[8px_8px_0px_0px_#000] inline-block">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-2xl font-black uppercase">
                  {filter === 'completed' ? 'No completed tasks' :
                   filter === 'active' ? 'No active tasks' :
                   'No tasks yet'}
                </div>
                <div className="text-lg font-bold mt-2">
                  {filter === 'all' && 'Add your first todo above!'}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoPage