import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

type Props = {
  list: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoBox = ({ list, todos, setTodos }: Props) => {
  const handleDone = (id: number) => {
    setTodos(
      todos.map((list) =>
        list.id === id ? { ...list, isDone: !list.isDone } : list
      )
    );
  };

  const handleDelete = (id: number) => {
    const filtered = todos.filter((list) => list.id !== id);
    setTodos(filtered);
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(list.todo);
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((list) => (list.id === id ? { ...list, todo: editTodo } : list))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="single-todos" onSubmit={(e) => handleEdit(e, list.id)}>
      {edit ? (
        <input
          ref={inputRef}
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="edit-todo-text"
        />
      ) : list.isDone ? (
        <s className="single-todos-text">{list.todo}</s>
      ) : (
        <span className="single-todos-text">{list.todo}</span>
      )}

      <div className="icons">
        <span
          className="icon"
          onClick={() => {
            if (!edit && !list.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(list.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(list.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};
