import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const AddTodoForm = ({ onAddTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      onAddTodo({
        id: Date.now(),
        text: todoText.trim(),
        completed: false,
        priority,
        createdAt: new Date().toISOString()
      });
      setTodoText('');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTodoText('');
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-full p-6 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 font-black text-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-3">
            <Plus size={28} className="stroke-[3px]" />
            <span>ADD NEW TODO</span>
          </div>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase">Add New Todo</h2>
            <motion.button
              onClick={handleCancel}
              className="p-2 bg-red-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="stroke-[3px]" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="todoText" className="block text-lg font-black uppercase mb-3">
                What needs to be done?
              </label>
              <input
                id="todoText"
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter your todo..."
                className="w-full p-4 border-4 border-black font-bold text-lg focus:outline-none focus:ring-0 focus:border-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-lg font-black uppercase mb-3">
                Priority Level
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'low', label: 'LOW', color: 'bg-green-400' },
                  { value: 'medium', label: 'MEDIUM', color: 'bg-yellow-400' },
                  { value: 'high', label: 'HIGH', color: 'bg-red-400' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => setPriority(option.value)}
                    className={`px-6 py-3 border-4 border-black font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ${
                      priority === option.value 
                        ? `${option.color} scale-105` 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: priority === option.value ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={!todoText.trim()}
                className={`flex-1 py-4 px-6 border-4 border-black font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ${
                  todoText.trim() 
                    ? 'bg-green-400 hover:bg-green-500 cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed opacity-50'
                }`}
                whileHover={todoText.trim() ? { scale: 1.02 } : {}}
                whileTap={todoText.trim() ? { scale: 0.98 } : {}}
              >
                ADD TODO
              </motion.button>
              
              <motion.button
                type="button"
                onClick={handleCancel}
                className="px-8 py-4 bg-gray-400 border-4 border-black font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                CANCEL
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default AddTodoForm;