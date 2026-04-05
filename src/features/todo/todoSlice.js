import { createSlice ,nanoid} from '@reduxjs/toolkit';

const loadFromLocalStorage =()=>{
    try{
        const serializedState = localStorage.getItem("todos");
        if(serializedState === null){
            return [{id:1 ,text:"Hello World"}];
        }

        return JSON.parse(serializedState);
    }catch(e){
        console.warn("could not load data",e)
        return [];
    }
}
const initialState = {
    todos: loadFromLocalStorage()
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state,action) => {
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
        updateTodo: (state, action) =>{
            const {id, text} = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
            if(existingTodo){
                existingTodo.text = text;
            }
        },
        toggleTodo: (state, action) =>{
            const todo = state.todos.find((t) => t.id === action.payload);
    
            if (todo) {
                // If it was false, it becomes true. If true, it becomes false.
                todo.completed = !todo.completed;
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions;

export default todoSlice.reducer;
