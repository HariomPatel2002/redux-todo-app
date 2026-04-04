import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

const localStorageMiddleware = ({getState}) =>{
    return next=> action => {
        const result = next(action);
        localStorage.setItem('todos', JSON.stringify(getState().todos));
        return result;
    }
}

export const store = configureStore({
    reducer: todoReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})