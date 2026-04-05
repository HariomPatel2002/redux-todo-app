import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo, toggleTodo } from "../features/todo/todoSlice"; // Import toggle
import { useState } from "react";

function Todos() {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

    const handleSave = (id) => {
        dispatch(updateTodo({ id, text: editText }));
        setEditId(null);
    };

    const startEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    // FILTER LOGIC: Calculate which todos to show
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>My Todos</div>

            {/* FILTER BAR */}
            <div style={styles.filterBar}>
                {['all', 'active', 'completed'].map((f) => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            ...styles.filterBtn,
                            backgroundColor: filter === f ? '#007bff' : '#eee',
                            color: filter === f ? 'white' : 'black'
                        }}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <ul style={styles.list}>
                {filteredTodos.map((todo) => (
                    <li key={todo.id} style={styles.listItem}>
                        {editId === todo.id ? (
                            <>
                                <input 
                                    style={styles.editInput}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => handleSave(todo.id)} style={styles.saveButton}>Save</button>
                            </>
                        ) : (
                            <>
                                <div style={styles.todoContent}>
                                    <input 
                                        type="checkbox" 
                                        checked={todo.completed || false}
                                        onChange={() => dispatch(toggleTodo(todo.id))}
                                    />
                                    <span style={{
                                        ...styles.todoText,
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        opacity: todo.completed ? 0.6 : 1
                                    }}>
                                        {todo.text}
                                    </span>
                                </div>
                                <div style={styles.buttonGroup}>
                                    <button onClick={() => startEdit(todo)} style={styles.updateButton}>Edit</button>
                                    <button onClick={() => dispatch(removeTodo(todo.id))} style={styles.deleteButton}>Remove</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Add these to your styles object
const styles = {
    // ... keep your existing styles ...
    filterBar: { display: 'flex', gap: '5px', marginBottom: '20px' },
    filterBtn: { padding: '5px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', textTransform: 'capitalize' },
    todoContent: { display: 'flex', alignItems: 'center', gap: '10px' },
    // Update existing listItem to ensure content stays aligned
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee' },
    // Ensure buttonGroup is also flex
    buttonGroup: { display: 'flex', gap: '5px' },
    saveButton: { padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    updateButton: { padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteButton: { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    todoText: { fontSize: '16px', color: '#555' },
    container: { maxWidth: '400px', marginTop: '20px', fontFamily: 'Arial, sans-serif' },
    header: { fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' },
    list: { listStyleType: 'none', padding: 0 },
    editInput: { flexGrow: 1, padding: '5px', marginRight: '10px' },
};

export default Todos;