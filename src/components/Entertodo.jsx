import { useRef } from "react";
import { MdLibraryAdd } from "react-icons/md";

function Entertodo({ onNewItem }) {
  const todoNameElement = useRef();
  const dueDateElement = useRef();

  const handleAddButtonClicked = (event) => {
    event.preventDefault();

    const todoName = todoNameElement.current.value;
    const dueDate = dueDateElement.current.value;

    if (todoName.trim() === "" || dueDate.trim() === "") return; // simple validation

    onNewItem(todoName, dueDate);

    // Clear inputs after adding
    todoNameElement.current.value = "";
    dueDateElement.current.value = "";
  };

  return (
    <div className="card add-card mb-3">
      <div className="card-body p-3">
        <form onSubmit={handleAddButtonClicked} className="row g-2">
          <div className="col-8">
            <input 
              ref={todoNameElement} 
              type="text" 
              className="form-control bg-white text-dark" 
              placeholder="Enter your task description" 
            />
          </div>
          <div className="col-3">
            <input 
              ref={dueDateElement} 
              type="date" 
              className="form-control bg-white text-dark" 
            />
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-add w-100 h-100">
              <MdLibraryAdd />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Entertodo;
