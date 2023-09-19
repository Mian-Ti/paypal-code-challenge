import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

// Props 类型
type Props = ConnectedProps<typeof connector>;

type Todo = {
    id: number,
    text: string,
    done: boolean
}

const TodoList = ({ todos, addTodo, toggleTodo }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        done: false,
      };
      addTodo(newTodo);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
  };

  return (
  <div className="flex flex-col items-center">
  <div className="flex flex-row flex-nowrap justify-between m-3">
    <TextField
      label="Add Todo"
      value={inputValue}
      onChange={handleInputChange}
      className="w-2/3"
    />
    <Button
      variant="contained"
      onClick={handleAddTodo}
      className="ml-2"
    >
      Add
    </Button>
  </div>
  <List className="w-2/3">
    {todos.map(todo => (
      <ListItem
        key={todo.id}
        onClick={() => handleToggleTodo(todo.id)}
        disablePadding
        className="cursor-pointer"
      >
        <Checkbox checked={todo.done} />
        <Typography className={todo.done ? 'line-through' : ''}>
          {todo.text}
        </Typography>
      </ListItem>
    ))}
  </List>
</div>
);
};

// 将 Redux 的 state 映射到组件的 props
const mapStateToProps = (state: RootState) => ({
  todos: state.todos,
});

// 将 dispatch 方法映射到组件的 props
const mapDispatchToProps = {
  addTodo: (todo: Todo) => ({ type: 'ADD_TODO', payload: todo }),
  toggleTodo: (id: number) => ({ type: 'TOGGLE_TODO', payload: id }),
};

// 创建连接器
const connector = connect(mapStateToProps, mapDispatchToProps);

// 使用连接器连接组件和 Redux
export default connector(TodoList);