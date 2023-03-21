import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import {useCallback, useReducer, useRef, useState} from "react";


function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 2500; i++) {
        array.push({
            id: i,
            text: `할 일 ${i}`,
            checked: false,
        });
    }
    return array;
}

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT': // 새로 추가
            // { type: 'INSERT'. todo: { id: 1, text: 'todo'. checked: false } }
            return todos.concat(action.todo);
        case 'REMOVE': // 제거
            // { type: 'REMOVE'. id: 1 }
            return todos.filter(todo => todo.id !== action.id);
        case 'INSERT': // 새로 추가
            // { type: 'INSERT'. todo: { id: 1, text: 'todo'. checked: false } }
            return todos.map(todo => todo.id === action.id ? {
                    ...todo, checked: !todo.checked
                } : todo,
            );
        default:
            return todos;
    }
}


const App = () => {
    // createBulkTodos()는 리렌더링때마다 호출되지만, 아래와 같이 넣으면 처음 렌더링 될때만 실행됨
    // const [todos, setTodos] = useState(createBulkTodos);
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

    // 고윳값으로 사용될 id
    // ref를 사용하여 변수 담기
    const nextId = useRef(2501);

    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            dispatch({type: 'INSERT', todo});
            nextId.current += 1; // nextId 1씩 더하기
        }, [],
    );

    const onRemove = useCallback(
        id => {
            dispatch({type: 'REMOVE', id});
        },
        [],
    );

    const onToggle = useCallback(
        id => {
            dispatch({type: 'TOGGLE', id});
        },
        [],
    );




  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
