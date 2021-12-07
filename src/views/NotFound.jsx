import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFound() {
  return (
    <section className= 'container has-text-centered'>
        <br/><br/>
      <h2 class='title'>404 Error</h2>
      <p class='subtitle'>The page you are looking for does not exist</p>
      <Link to="/" class='button is-danger'>Ir a inicio</Link>
    </section>
  );
}
