import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HopOff } from 'lucide-react';


export default function Header({ token, handleLogout }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/"><div><HopOff className="nav-icon"/> Santas Login</div></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav >
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            {token ? (
              <>
                <NavLink to="/account/profile" className="nav-link">
                  Profile
                </NavLink>
                <NavLink to="/account/settings" className="nav-link">
                  Inställningar
                </NavLink>
                <NavLink to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </NavLink>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  );
}
