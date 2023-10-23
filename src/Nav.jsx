import { Link } from 'react-router-dom';

const Nav = props => {
  const { admin } = props;
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {admin && <li className="admin">Modo admin activado</li>}
        <li><Link to="/new">Nuevo Post</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;