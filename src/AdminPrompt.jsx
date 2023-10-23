// imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPrompt = props => {
  // props
  const { setAdmin } = props;
  // hooks
  const navigate = useNavigate();
  const [pass, setPass] = useState(''); // state var for input
  // event handlers
  const handleSubmit = e => {
    e.preventDefault();
    if (pass == '1234') setAdmin(true);
    navigate('/');
  };
  // render
  return (
    <form className="admin-prompt" onSubmit={handleSubmit}>
      <h2>Ingresar como admin</h2>
      <input placeholder="Admin password" 
             type="password" 
             onChange={e => setPass(e.target.value)} 
             value={pass} 
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default AdminPrompt;