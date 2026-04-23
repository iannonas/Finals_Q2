import { AddTodoForm } from '../components/AddTodoForm'
import { TodoList } from '../components/TodoList'

export const TodoPage = () => {
  return (
    <section>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </section>
  )
}
