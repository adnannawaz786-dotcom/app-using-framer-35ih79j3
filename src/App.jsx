import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, X, Edit3 } from 'lucide-react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

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
    if (newTodo.trim()) {
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
    if (editingText.trim()) {
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-4 font-mono">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black text-white p-8 border-8 border-black shadow-[12px_12px_0px_0px_#000] mb-8"
        >
          <h1 className="text-4xl font-black uppercase tracking-wider text-center">
            TODO BRUTALIST
          </h1>
          <p className="text-center mt-2 text-lg font-bold">
            GET STUFF DONE OR DIE TRYING
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000] p-6 mb-8"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="WHAT NEEDS TO BE DONE?"
              className="flex-1 p-4 text-xl font-bold border-4 border-black bg-pink-200 placeholder-black focus:outline-none focus:bg-pink-300 uppercase"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTodo}
              className="bg-green-400 border-4 border-black px-6 py-4 font-black text-xl hover:bg-green-500 shadow-[4px_4px_0px_0px_#000] active:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <Plus size={24} />
            </motion.button>
          </div>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border-8 border-black shadow-[6px_6px_0px_0px_#000] p-4 ${
                  todo.completed ? 'bg-gray-200' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-8 h-8 border-4 border-black flex items-center justify-center font-black ${
                      todo.completed
                        ? 'bg-green-400 shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {todo.completed && <Check size={16} />}
                  </motion.button>

                  {editingId === todo.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={handleEditKeyPress}
                        className="flex-1 p-2 text-lg font-bold border-4 border-black bg-blue-200 focus:outline-none focus:bg-blue-300"
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveEdit}
                        className="bg-green-400 border-4 border-black px-3 py-2 font-black hover:bg-green-500"
                      >
                        <Check size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelEdit}
                        className="bg-red-400 border-4 border-black px-3 py-2 font-black hover:bg-red-500"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`flex-1 text-lg font-bold uppercase ${
                          todo.completed
                            ? 'line-through text-gray-600'
                            : 'text-black'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="bg-blue-400 border-4 border-black px-3 py-2 font-black hover:bg-blue-500 shadow-[2px_2px_0px_0px_#000] active:shadow-[1px_1px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                      >
                        <Edit3 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-400 border-4 border-black px-3 py-2 font-black hover:bg-red-500 shadow-[2px_2px_0px_0px_#000] active:shadow-[1px_1px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center"
          >
            <h2 className="text-2xl font-black uppercase mb-4">NO TODOS YET</h2>
            <p className="text-lg font-bold text-gray-600 uppercase">
              ADD SOMETHING TO GET STARTED
            </p>
          </motion.div>
        )}

        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black text-white p-4 border-8 border-black shadow-[6px_6px_0px_0px_#000] mt-8 text-center"
          >
            <p className="font-black text-lg uppercase">
              {todos.filter(t => !t.completed).length} OF {todos.length} TASKS REMAINING
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App