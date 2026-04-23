import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'
import type { Todo } from '../types/todo'
import { EditTodoModal } from './EditTodoModal'

type TodoItemProps = {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [showModal, setShowModal] = useState(false)
  const { deleteTodo, toggleTodo } = useTodos()
  const navigate = useNavigate()

  const onToggle = async () => {
    const success = await toggleTodo(todo.id)
    if (success) {
      navigate('/')
    }
  }

  const onDelete = async () => {
    const success = await deleteTodo(todo.id)
    if (success) {
      navigate('/')
    }
  }

  return (
    <li className="todo-item">
      <span className={todo.completed ? 'done' : ''}>{todo.title}</span>
      <div className="row">
        <button type="button" onClick={onToggle}>
          Toggle
        </button>
        <button type="button" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
      {showModal && <EditTodoModal todo={todo} onClose={() => setShowModal(false)} />}
    </li>
  )
}
