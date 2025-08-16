import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Check, X } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim()) {
        onEdit(todo.id, editText.trim());
      } else {
        setEditText(todo.text);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ 
        opacity: 0, 
        x: -100, 
        scale: 0.95,
        transition: { duration: 0.2 }
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      layout
      className={`
        group relative p-4 mb-3 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]
        transition-all duration-200 hover:shadow-[12px_12px_0px_0px_#000]
        ${todo.completed ? 'bg-green-100' : 'bg-white'}
      `}
    >
      {/* Completion Status Indicator */}
      <motion.div
        className={`
          absolute -top-2 -left-2 w-6 h-6 border-4 border-black
          ${todo.completed ? 'bg-green-400' : 'bg-yellow-400'}
        `}
        animate={{ 
          rotate: todo.completed ? 360 : 0,
          scale: todo.completed ? 1.1 : 1
        }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      <div className="flex items-center justify-between gap-4">
        {/* Checkbox and Text */}
        <div className="flex items-center gap-4 flex-1">
          <motion.button
            onClick={() => onToggle(todo.id)}
            className={`
              w-8 h-8 border-4 border-black flex items-center justify-center
              transition-colors duration-200 hover:scale-110
              ${todo.completed ? 'bg-green-400' : 'bg-white hover:bg-gray-100'}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ 
                scale: todo.completed ? 1 : 0,
                opacity: todo.completed ? 1 : 0
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check size={16} className="text-black font-bold" />
            </motion.div>
          </motion.button>

          {isEditing ? (
            <motion.input
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border-4 border-black bg-yellow-100 text-black font-bold text-lg focus:outline-none focus:bg-yellow-200"
              autoFocus
            />
          ) : (
            <motion.span
              className={`
                flex-1 text-lg font-bold text-black cursor-pointer
                ${todo.completed ? 'line-through opacity-70' : ''}
              `}
              onClick={() => onToggle(todo.id)}
              animate={{ 
                opacity: todo.completed ? 0.7 : 1,
                scale: todo.completed ? 0.98 : 1
              }}
            >
              {todo.text}
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <motion.button
                onClick={handleEdit}
                className="p-2 bg-green-400 border-4 border-black hover:bg-green-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Save"
              >
                <Check size={18} className="text-black" />
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="p-2 bg-gray-400 border-4 border-black hover:bg-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Cancel"
              >
                <X size={18} className="text-black" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={handleEdit}
                className="p-2 bg-blue-400 border-4 border-black hover:bg-blue-300 transition-colors opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Edit"
              >
                <Edit2 size={18} className="text-black" />
              </motion.button>
              <motion.button
                onClick={() => onDelete(todo.id)}
                className="p-2 bg-red-400 border-4 border-black hover:bg-red-300 transition-colors opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Delete"
              >
                <Trash2 size={18} className="text-black" />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Priority Indicator */}
      {todo.priority && (
        <motion.div
          className={`
            absolute -bottom-2 -right-2 px-2 py-1 border-4 border-black text-xs font-bold
            ${todo.priority === 'high' ? 'bg-red-400' : 
              todo.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'}
          `}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {todo.priority.toUpperCase()}
        </motion.div>
      )}

      {/* Completion Animation Overlay */}
      {todo.completed && (
        <motion.div
          className="absolute inset-0 bg-green-400 opacity-20 pointer-events-none"
          initial={{ scale: 0, borderRadius: "50%" }}
          animate={{ scale: 1, borderRadius: "0%" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      )}
    </motion.div>
  );
};

export default TodoItem;