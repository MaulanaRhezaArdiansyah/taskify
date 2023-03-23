import React from "react";
import { Todo } from "../model";
import "./styles.css";
import { TodoBox } from "./TodoBox";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos.map((list) => (
        <TodoBox key={list.id} list={list} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};
