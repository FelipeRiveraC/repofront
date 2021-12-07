import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import config from "../config";
import CreateViaje from "../components/CreateViaje";
import useAuth from "../hooks/useAuth";
import DeletePost from "../components/DeletePost";

const ViajesList = () => {
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
      fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, requestOptions)
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
      fetch(`${config.API_URL}/api/posts`)
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
    const addViaje = (viaje) => setViajes((prevState) => [...prevState, viaje]);

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
            {currentUser ? (
            <CreateViaje addViaje={addViaje} />
          ) : (
            <p>Log in to create a new artist</p>
          )}
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
                        
                        {(currentUser.id == viaje.userId || currentUser.admin) ? (
                          <span>
                            <button onClick={() => handleRemove(viaje.id)} >BORRAR</button>
                            <button>
                            <a class='white' href={`/viajes/edit/${viaje.id}`}>EDITAR</a></button>
 
                          </span>
                          ) : ( <p>No puedes borrar este viaje</p> )}
                        </p>
                    </footer> 
                </div>
            ))}
        </div>
    )
}

export default ViajesList;
