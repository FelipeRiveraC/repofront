import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import config from "../config";
import useAuth from "../hooks/useAuth";

const UsersList = () => {
    const [viajes, setViajes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { currentUser } = useAuth();
    function handleRemove(id) {
      const newList = viajes.filter((item) => item.id !== id);
      
      setViajes(newList);
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}/api/user/${id}`, requestOptions)
        .then((response) => {
          if (!(response.status == 200)) {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }


    useEffect(() => {
      setLoading(true);
      fetch(`${config.API_URL}/api/user`)
        .then((response) => {
          if (!response.ok) {
            setError(true);
            return [];
          }
          return response.json();
        })
        .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, UsersList) => setViajes(UsersList)))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, []);
  
    if (loading) {
      return (
        <section className="container">
          <h2>Loading...</h2>
        </section>
      );
    }
    console.log(viajes);

    return (
        <div class='container  is-max-desktop has-text-centered '>
            <h2 class='title'>Viajes</h2>

            {viajes.map((viaje) => (
                <div class="card mt-5 mr-5 ml-5 mb-5 is-danger">
                    <div class="card-content ">
                        <p class="title white"><hr />
                        Usuario:  {viaje.name}
                        </p><br/>
                        <p class="subtitle white">
                        Email: {viaje.email}
                        </p>
                        <p class="subtitle white">
                        Username: {viaje.username}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                        <span>  
                            <a class='white' href={`/usuarios/${viaje.id}`}>Ver Detalles</a>
                        </span>
                        </p>
                        <p class="card-footer-item">
                        <span>
                        {(currentUser.id == viaje.id || currentUser.admin) ? (
                          <span>
                            <button>
                            <a class='white' href={`/usuarios/edit/${viaje.id}`}>EDITAR</a></button>
                            <button onClick={() => handleRemove(viaje.id)} >BORRAR</button>
                          </span>
                          ) : ( <p>No puedes borrar este viaje</p> )}
                        </span>
                        </p>
                    </footer> 
                </div>
            ))}
        </div>
    )
}

export default UsersList;
