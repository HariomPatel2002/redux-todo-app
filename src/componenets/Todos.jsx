import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todos() {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    // Local state to handle editing
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleSave = (id) => {
        dispatch(updateTodo({ id, text: editText }));
        setEditId(null); // Exit edit mode
    };

    const startEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>My Todos</div>
            <ul style={styles.list}>
                {todos.map((todo) => (
                    <li key={todo.id} style={styles.listItem}>
                        {editId === todo.id ? (
                            /* EDIT MODE */
                            <>
                                <input 
                                    style={styles.editInput}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => handleSave(todo.id)} style={styles.saveButton}>
                                    Save
                                </button>
                            </>
                        ) : (
                            /* VIEW MODE */
                            <>
                                <span style={styles.todoText}>{todo.text}</span>
                                <div style={styles.buttonGroup}>
                                    <button 
                                        onClick={() => startEdit(todo)}
                                        style={styles.updateButton}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => dispatch(removeTodo(todo.id))}
                                        style={styles.deleteButton}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    // ... your existing container, header, list, and listItem styles ...
    container: { maxWidth: '400px', marginTop: '20px', fontFamily: 'Arial, sans-serif' },
    header: { fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' },
    list: { listStyleType: 'none', padding: 0 },
    listItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', marginBottom: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee' },
    
    editInput: { flexGrow: 1, padding: '5px', marginRight: '10px' },
    buttonGroup: { display: 'flex', gap: '5px' },
    
    saveButton: { padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    updateButton: { padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteButton: { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Todos;