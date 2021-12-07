import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import config from "../config";
const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/posts/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, viajesList) => setViajes(viajesList)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, usersList) => setUsers(usersList)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container">
        <h2 class='title'>Loading...</h2>
      </section>
    );
  }
  return(
    <section className= 'container has-text-centered'>
      <Link to='/'>Home</Link>
      <h2 class='title'>{`Perfil de  ${users.name}`}</h2> <br />
      <h2 class='subtitle'>Email: <strong>{users.email}</strong></h2>
      <h2 class='subtitle'>Username: <strong>{users.username}</strong></h2>
      <h2 class='subtitle'>Edad: <strong>{users.edad}</strong></h2>
      <div>
        <button onClick={() => navigate(-1)} type="button" className="button">Back</button>
      </div>
      {viajes.map((viaje) => (
                <div class="card mt-5 mr-5 ml-5 mb-5 is-danger">
                    <div class="card-content ">
                        <p class="title white"><hr />
                        Viaje a {viaje.nombre}
                        </p><br/>
                        <p class="subtitle white">
                        Viaje para el {viaje.fecha}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                        <span>  
                            <a class='white' href={`/viajes/${viaje.id}`}>Ver Detalles</a>
                        </span>
                        </p>
                        <p class="card-footer-item">
                        
                        </p>
                    </footer> 
                </div>
            ))}


    </section>  
  )
}

export default UserDetail;
