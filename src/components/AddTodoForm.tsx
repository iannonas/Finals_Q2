import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'

type AddTodoFormValues = {
  title: string
}

export const AddTodoForm = () => {
  const { addTodo } = useTodos()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTodoFormValues>()

  const onSubmit = async ({ title }: AddTodoFormValues) => {
    const success = await addTodo(title)
    if (success) {
      reset()
      navigate('/')
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Todo</h2>
      <input
        type="text"
        placeholder="Enter todo title"
        {...register('title', {
          required: 'Title is required',
          validate: (value) => value.trim().length > 0 || 'Title is required',
        })}
      />
      {errors.title && <p className="error">{errors.title.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
