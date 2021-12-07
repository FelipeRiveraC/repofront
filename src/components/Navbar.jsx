import React from 'react';
import logo from '../assets/images/icon.png';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Navbar() {
    const { currentUser, handleUserLogout } = useAuth();
    return (
    <b-navbar>
      <nav class="navbar is-link" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
          <a class="navbar-item" href="/">
          <img src={logo} width="112" height="28" />
          </a>
  
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          </a>
      </div>
  
      <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
          <a class="navbar-item" href='viajes'>
              Viajes
          </a>
  
          <a href='https://documenter.getpostman.com/view/17834314/UVC6k7gT' class="navbar-item">
              API Documentation
          </a>
  
          
          </div>
  
          <div class="navbar-end">
          <div class="navbar-item">
              <div class="buttons">

            <li>
                
            
              {currentUser ? (
                <div>
                    <button class='button is-light' type="button" onClick={handleUserLogout}>Logout</button>
                
                    <button class='button is-danger'>
                            <a class='' href={`/usuarios/${currentUser.id}`}>Mi perfil</a></button>
                </div>

              ) : (
                <div>
                <Link class='button is-light' to="login">Log In</Link>
                <Link class='button is-danger' to="register">Registrarme</Link></div>
                    )}
            </li>
            
              </div>
          </div>
          </div>
      </div>
      </nav>
    </b-navbar>
    );
  }
  
  export default Navbar;
  