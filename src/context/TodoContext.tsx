import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Todo } from '../types/todo'

type TodoContextValue = {
  todos: Todo[]
  loading: boolean
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<boolean>
  updateTodo: (id: string, updates: Pick<Todo, 'title' | 'completed'>) => Promise<boolean>
  toggleTodo: (id: string) => Promise<boolean>
  deleteTodo: (id: string) => Promise<boolean>
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined)

const API_URL = 'http://localhost:5000/api/todos'

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTodos = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) return
      const data: Todo[] = await res.json()
      setTodos(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const addTodo = useCallback(async (title: string) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return false

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: trimmedTitle, completed: false }),
    })

    if (!res.ok) return false

    const createdTodo: Todo = await res.json()
    setTodos((current) => [...current, createdTodo])
    return true
  }, [])

  const updateTodo = useCallback(async (id: string, updates: Pick<Todo, 'title' | 'completed'>) => {
    const trimmedTitle = updates.title.trim()
    if (!trimmedTitle) return false

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: trimmedTitle, completed: updates.completed }),
    })

    if (!res.ok) return false

    const updated: Todo = await res.json()
    setTodos((current) => current.map((todo) => (todo.id === id ? updated : todo)))
    return true
  }, [])

  const toggleTodo = useCallback(
    async (id: string) => {
      const existing = todos.find((todo) => todo.id === id)
      if (!existing) return false
      return updateTodo(id, { title: existing.title, completed: !existing.completed })
    },
    [todos, updateTodo],
  )

  const deleteTodo = useCallback(async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) return false
    setTodos((current) => current.filter((todo) => todo.id !== id))
    return true
  }, [])

  useEffect(() => {
    void fetchTodos()
  }, [fetchTodos])

  const value = useMemo(
    () => ({ todos, loading, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo }),
    [todos, loading, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider')
  }
  return context
}
