import { useTodos } from '../hooks/useTodos'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const { todos, loading } = useTodos()

  if (loading) return <p>Loading todos...</p>
  if (!todos.length) return <p>No todos yet.</p>

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
