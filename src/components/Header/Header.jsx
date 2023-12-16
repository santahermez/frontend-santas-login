import './Header.css'
import { NavLink } from "react-router-dom";

export default function Header({ token, handleLogout}) {
  return (
    <header className='header'>
      <h1>This is a header</h1>
      <p>{token ? 'Inloggad' : 'Inte inloggad'}</p>
      <nav>
        <div className="nav-container">
          <NavLink to="/">Hem</NavLink>
            {token ? (
              <>
                <NavLink to="/account/profile">Profil</NavLink>
                <NavLink to="/account/settings">inställningar</NavLink>
                <NavLink to="/" onClick={handleLogout}>
                  Logga ut
                </NavLink>
              </>
            ) : (
              <NavLink to="/login">Logga in</NavLink>
            )}
        </div>
      </nav>
    </header>
  )
}
