/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setUpdatedTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  deleteSelectedTodo: (currentTodos: Todo[], todoToDelete: Todo) => Todo[];
  updatedTodoTitle: string;
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  setUpdatedTodoTitle,
  updatedTodoTitle,
  selectedTodo,
  setSelectedTodo,
  setTodoTitle,
  setTodos,
  deleteSelectedTodo,
  isLoading,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <div
        data-cy="Todo"
        key={todo.id}
        className={classNames('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onClick={() => toggleTodo(todo)}
          />
        </label>

        {todo.id === selectedTodo?.id ? (
          <form
            onSubmit={event => {
              event.preventDefault();

              setTodoTitle(updatedTodoTitle);
              if (updatedTodoTitle === '') {
                setTodos(currentTodos =>
                  deleteSelectedTodo(currentTodos, todo),
                );
              }
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              autoFocus={selectedTodo.id === todo.id}
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              onBlur={() => setSelectedTodo(null)}
              onChange={event => setUpdatedTodoTitle(event.target.value)}
              value={updatedTodoTitle}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              onDoubleClick={() => {
                setSelectedTodo(todo);
                setUpdatedTodoTitle(todo.title);
              }}
              onBlur={() => setSelectedTodo(null)}
              className="todo__title"
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() =>
                setTodos(currentTodos => deleteSelectedTodo(currentTodos, todo))
              }
            >
              ×
            </button>
          </>
        )}

        <div
          data-cy="TodoLoader"
          className={classNames('modal overlay', {
            'is-active': isLoading,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
