import React from 'react'
import "../styles/Home.css"

function TodoItem({title,description, isCompleted, id, checkHandler,clickHandler}) {
  return (
    <div className="task-div">
        <div className="task-info">
        <h4>{title}</h4>
        <h5>{description}</h5>
        </div>
        <div className="task-func">
        <div className="checkbox">
        <input type="checkbox" name="isCompleted" value={isCompleted} checked={isCompleted} onChange={() => {
            checkHandler(id);
            console.log(isCompleted)
        }}/></div>
        <button onClick={() => {
          clickHandler(id);
        }}>DELETE</button>
      </div>
      </div>
  )
}

export default TodoItem
