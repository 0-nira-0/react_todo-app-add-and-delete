/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onUpdate: (
    event: React.FormEvent<HTMLFormElement>,
    todoId: Todo['id'],
    newTitle: string,
  ) => Promise<void>;
  onDelete: (todoId: Todo['id']) => void;
  onToggle: (todoId: Todo['id']) => void;
  loadingTodoIds: Todo['id'][];
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onUpdate,
  onDelete,
  onToggle,
  loadingTodoIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
          loadingTodoIds={loadingTodoIds}
        />
      ))}
      {tempTodo && <TodoItem todo={tempTodo} loadingTodoIds={[0]} />}
    </section>
  );
};
