import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'
import type { Todo } from '../types/todo'

type EditTodoModalProps = {
  todo: Todo
  onClose: () => void
}

export const EditTodoModal = ({ todo, onClose }: EditTodoModalProps) => {
  const [title, setTitle] = useState(todo.title)
  const [submitting, setSubmitting] = useState(false)
  const { updateTodo } = useTodos()
  const navigate = useNavigate()

  const onSave = async () => {
    setSubmitting(true)
    const success = await updateTodo(todo.id, { title, completed: todo.completed })
    setSubmitting(false)

    if (success) {
      onClose()
      navigate('/')
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Todo</h3>
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
        <div className="row">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" disabled={submitting} onClick={onSave}>
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
