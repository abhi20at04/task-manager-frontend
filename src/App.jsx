import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/authcontext.jsx';

import Appname from "./components/Appname";
import Entertodo from "./components/Entertodo";
import Todoitems from "./components/Todoitems";
import WelcomeMessage from "./components/WelcomeMessage";
import Login from "./components/logins";
import Signup from "./components/signup";
import "./App.css";

function TodoApp() {
  const { token, clearToken } = useContext(AuthContext);
  const [todoItems, settodoItems] = useState([]);
  const [completedItems, setCompletedItems] = useState(new Set());

  React.useEffect(() => {
    if (!token) return;
    import('axios').then(axios => {
      axios.default.get("https://taskmanager-backend-dlz9.onrender.com/api/todos", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => settodoItems(res.data))
      .catch((err) => console.error(err));
    });
  }, [token]);

  const total = todoItems.length;
  const completed = completedItems.size;
  const percentage = total > 0 ? (completed / total * 100) : 0;

  const handleNewItem = (itemName, itemDueDate) => {
    import('axios').then(axios => {
      axios.default.post(
        "https://taskmanager-backend-dlz9.onrender.com/api/todos",
        { name: itemName, dueDate: itemDueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() =>
        axios.default.get("https://taskmanager-backend-dlz9.onrender.com/api/todos", {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
      .then((res) => settodoItems(res.data))
      .catch((err) => console.error(err));
    });
  };

  const handleDeleteItem = (todoId) => {
  import('axios').then(axios => {
    axios.default.delete(`https://taskmanager-backend-dlz9.onrender.com/api/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => axios.default.get("https://taskmanager-backend-dlz9.onrender.com/api/todos", {
      headers: { Authorization: `Bearer ${token}` }
    }))
    .then((res) => settodoItems(res.data))
    .catch((err) => console.error(err));
  });
};

  const handleToggleCompleted = (todoId) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(todoId)) {
      newCompleted.delete(todoId);
    } else {
      newCompleted.add(todoId);
    }
    setCompletedItems(newCompleted);
  };


  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="header-gradient p-4 text-center">
        <Appname />
      </header>
      <div className="flex-grow d-flex justify-content-center align-items-start pt-2">
        <div className="container col-md-6 mx-auto">
          <div className="card todo-card">
            <div className="card-body p-4">
              <Entertodo onNewItem={handleNewItem} />
              {total > 0 && (
                <div className="mb-3">
                  <small className="progress-text d-block mb-1">{completed} of {total} completed</small>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${percentage}%`}} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              )}
              <Todoitems 
                todoItems={todoItems} 
                onDeleteClick={handleDeleteItem}
                completedItems={completedItems}
                onToggleCompleted={handleToggleCompleted}
              />
              {todoItems.length === 0 && <WelcomeMessage />}
              <div className="text-center mt-4">
                <button onClick={clearToken} className="btn btn-danger text-dark">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthScreen() {
  const [showSignup, setShowSignup] = useState(false);

  return showSignup ? (
    <Signup setShowSignup={setShowSignup} />
  ) : (
    <Login showSignup={showSignup} setShowSignup={setShowSignup} />
  );
}

function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      {!token ? <AuthScreen /> : <TodoApp />}
    </>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

