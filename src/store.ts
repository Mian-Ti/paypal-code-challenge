import { createStore } from "redux";

// 定义 Todo 类型
interface Todo {
    id: number;
    text: string;
    done: boolean;
}

// 初始状态
interface AppState {
    todos: Todo[];
}

const initialState: AppState = {
    todos: [] as Todo[],
};

// Reducer 函数
const rootReducer = (state = initialState, action: any): AppState => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, done: !todo.done } : todo
                ),
            };
        default:
            return state;
    }
};

// 创建 Redux Store
const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof rootReducer>;