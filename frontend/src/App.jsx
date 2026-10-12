import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      // Replace this with your actual API call
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodos = async () => {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodos}>Add Todo</button>
      <ul>
        {todos.map((e) => (
          <li id={e._id}>{e.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
