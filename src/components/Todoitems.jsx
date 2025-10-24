import Todoitem from "./Todoitem";
import styles from "./todoitems.module.css";

const Todoitems = ({ todoItems, onDeleteClick, completedItems, onToggleCompleted }) => {
  return (
    <div className="list-group list-group-flush">
      {todoItems.map((item) => (
        <Todoitem
          key={item._id}
          todoDate={item.dueDate}
          todoName={item.name}
          todoId={item._id}
          onDeleteClick={onDeleteClick}
          isCompleted={completedItems.has(item._id)}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </div>
  );
};

export default Todoitems;
