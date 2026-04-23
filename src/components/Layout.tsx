import { Link, NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export const Layout = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand">
          Finals Q2 Todo
        </Link>
        <nav>
          <NavLink to="/" className="nav-link">
            Todos
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </nav>
        <button type="button" onClick={toggleTheme}>
          Theme: {theme}
        </button>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
