import React from 'react';
import logo from '../assets/images/icon.png';
import useAuth from '../hooks/useAuth';

function Portada() {
    const { currentUser } = useAuth();
    return (
        <div class='has-text-centered mt-5'>
            <img src={logo}/>
            <br/><br/>
            <div class="container">
                <div class="notification is-info mr-5 ml-5">
                    <h1 class='title'>Hola! {currentUser?.name}</h1>
                    
                    <h2 class='subtitle'> Bienvenido a <strong>
                        BeachWeekWeb</strong> </h2>
                    <p class='subtitle'>En BeachWeekWeb podras encontrar que hacer durante tus vacaciones. Mira los alojamientos disponibles</p>
                    <h2 class='subtitle'>Felipe Rivera</h2>
                    <h2 class='subtitle'>Thomas Robert</h2>
                    <h2 class='subtitle'>Santiago Compte</h2>
                    <br/>
                </div>
            </div>
            <div class="container mt-5  ">
                <div class="notification is-info mr-5 ml-5">
                    <h1 class='title'>Accesos rapidos</h1>
                    <br/>
                    <div class='flex-h'>
                        <a class="button is-link mr-3 ml-3 mb-3" href="/signup">Registrarme</a>
                        <a class="button is-link mr-3 ml-3 mb-3" href="/login">Login</a>
                        <a class="button is-link mr-3 ml-3 mb-3" href="/viajes">Ver viajes</a>
                        <a class="button is-link mr-3 ml-3 mb-3" href="/usuarios">Ver Usuarios</a>
                    </div>
                </div>
                <div></div>
            </div>
            
            
        </div>
    );
  }
  
  export default Portada;
  