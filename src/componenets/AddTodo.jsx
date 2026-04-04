import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice';
function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!input.trim()) return;

    dispatch(addTodo(input))
    setInput(''); 
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input 
        type="text" 
        placeholder="What needs to be done?" 
        required 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add
      </button>
    </form>
  );
}

// Keeping styles separate makes the component much cleaner
const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    maxWidth: '400px',
    margin: '20px 0'
  },
  input: {
    flexGrow: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default AddTodo;