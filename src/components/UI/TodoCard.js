import React, { useState } from "react";
import "./ToDoList.css";
import { ACTIONS } from "../reducer/TodoReducer";
import { HiOutlineTrash } from "react-icons/hi";
import Button from "../shared/Button";
import ToDoDetails from "./ToDoDetails";

export const TodoCard = ({ item, dispatch }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClose = () => {
    setShowDetails(false);
  };
  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length - 1) + "...";
    }
    return text;
  };

  return (
    <React.Fragment>
      <div className={showDetails ? "card-wraper" : "card-wraper__close"}>
        <div className="todo-card__wraper">
          <div className="todo-card">
            <div className="todo-item__title">
              <input
                className="checkbox"
                type="checkbox"
                id={item.id}
                checked={item.selected}
                onClick={() => {
                  dispatch({
                    type: ACTIONS.TOGGLE,
                    payload: {
                      id: item.id,
                    },
                  });
                }}
              />
              <p className="checkbox-title">
                {truncateText(
                  item.title.charAt(0).toUpperCase() + item.title.slice(1),
                  13
                )}
              </p>
            </div>
            <div className="todo-item__btn">
              <Button
                inverse="inverse"
                size="small"
                onClick={() => setShowDetails(true)}
              >
                View
              </Button>
              <Button
                danger="danger"
                size="small"
                onClick={() =>
                  dispatch({
                    type: ACTIONS.REMOVE,
                    payload: {
                      id: item.id,
                    },
                  })
                }
              >
                <HiOutlineTrash />
              </Button>
            </div>
          </div>
        </div>
        <div>
          {showDetails && (
            <ToDoDetails
              item={item}
              handleClose={handleClose}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default TodoCard;
