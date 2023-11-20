import { useEffect, useState } from "react";
import "./styles.css";

// Main component
export default function App() {
  // State for new todo input
  const [newItem, setNewItem] = useState("")

  // State for the list of todos, initialize from localStorage
  const [todos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("ITEM")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  // Effect hook to update localStorage when todos change
  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])
  
  
  // Functionto to handle form submission
  function handleSubmit(e) {
    e.preventDefault()
  

    // Add a new todo item
    setToDos(currentTodos => {
      return [
      ...currentTodos, 
    { id: crypto.randomUUID(), title: newItem, completed: 
      false },
  ]
})


// Clear the new item input field
setNewItem("")
}


// Function to toggle the completion status of a todo item
function toggleToDo(id, completed) {
  setToDos(currentTodos => {
    return currentTodos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed }

      }

      return todo
    })
  })
}


// Function to delete a todo item
function deleteTodo(id) {
  setToDos(currentTodos => {
    return currentTodos.filter(todo => todo.id != id)

  })
}

  
return (
  // JSX for the app
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item" />
    </div>
    <button className="btn">Add</button>
  </form>
  
  <h1 className="header">Todo List</h1>
  <ul className="list">
    {todos.length === 0 && "No Todo"}
    {todos.map(todo => {
      return (
      <li>
        <label key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={e => toggleToDo(todo.id, e.target.checked)} />
          {todo.title}

        </label>
        <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
      </li>
      )
    })}
  </ul>
  </>
  )
}