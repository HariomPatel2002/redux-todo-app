import './App.css'
import Todos from './componenets/Todos'
import AppTodo from './componenets/AddTodo'

function App() {
 

  return (
    <>
     <h1>Hello from redux side </h1>
     <AppTodo />
     <Todos/>
    </>
  )
}

export default App
