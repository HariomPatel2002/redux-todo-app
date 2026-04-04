import './App.css'
import Todos from './componenets/Todos'
import AppTodo from './componenets/AddTodo'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Redux Todo App</h1>
        <p>Manage your tasks efficiently with Redux Toolkit</p>
      </header>
      <main className="container">
        <div className="todo-section">
          <AppTodo />
          <Todos />
        </div>
      </main>
    </div>
  )
}

export default App
