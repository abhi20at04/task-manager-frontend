import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authcontext';

const TodoList = () => {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!token) return;

    axios.get('https://taskmanager-backend-dlz9.onrender.com/api/todos', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setTodos(res.data))
    .catch(console.error);
  }, [token]);

  if (!token) return <p>Please login to see your todos.</p>;

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo._id}>{todo.name} - {todo.dueDate}</li>
      ))}
    </ul>
  );
};

export default TodoList;
