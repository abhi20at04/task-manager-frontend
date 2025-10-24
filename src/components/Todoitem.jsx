import { RiDeleteBack2Fill } from "react-icons/ri";

function Todoitem({ todoName, todoDate, onDeleteClick, todoId, isCompleted, onToggleCompleted }) {
  return (
    <div className="task-item d-flex justify-content-between align-items-center p-3">
      <div className="form-check me-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isCompleted}
          onChange={() => onToggleCompleted(todoId)}
        />
      </div>
      <div className="flex-grow-1 me-3">
        <span className={isCompleted ? "text-decoration-line-through" : ""}>{todoName}</span>
      </div>
      <div className="text-end me-3">
        <small className="text-muted">{todoDate}</small>
      </div>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => onDeleteClick(todoId)}
      >
        <RiDeleteBack2Fill />
      </button>
    </div>
  );
}

export default Todoitem;
