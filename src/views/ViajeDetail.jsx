import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import config from "../config";
import CreatePanorama from "../components/CreatePanorama";
import CreateReserva from "../components/CreateReserva";
import useAuth from "../hooks/useAuth";
const ViajeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viajes, setViajes] = useState([]);
  const [panoramas, setPanoramas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  function handleRemovePanorama(id) {

    const newList = panoramas.filter((item) => item.id !== id);
    
    setPanoramas(newList);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/panoramas/${id}`, requestOptions)
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
  function handleRemoveReserva(id) {

    const newList = reservas.filter((item) => item.id !== id);
    
    setReservas(newList);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/reservas/${id}`, requestOptions)
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
    fetch(`${config.API_URL}/api/posts/${id}`)
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
    fetch(`${config.API_URL}/api/panoramas/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, panoramasList) => setPanoramas(panoramasList)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/reservas/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, reservasList) => setReservas(reservasList)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);
  const addPanorama = (panorama) => setPanoramas((prevState) => [...prevState, panorama]);
  const addReserva = (reserva) => setReservas((prevState) => [...prevState, reserva]);
  if (loading) {
    return (
      <section className="container">
        <h2>Loading...</h2>
      </section>
    );
  }

  return(
    <section className= 'container has-text-centered'>
      <Link to='/'>Home</Link>
      <hr />
      
      <h1 class='title'>{`Viaje a  ${viajes.nombre}`}</h1><br />
      <h2 class='subtitle'>Este viaje sera el <strong>{viajes.fecha}</strong></h2>
      <h2 class='subtitle'>Los cupos totales son <strong>{viajes.cupos}</strong></h2>
      <div class='container mr-5 ml-5'>
        <hr />
      <CreatePanorama addPanorama={addPanorama} />
      <h1 class='title has-text-light'>PANORAMAS</h1>
      <table class='table is-bordered is-striped is-fullwidth '>
        <thead class='mr-5 ml-5'>
            <tr>
                <th>Nombre</th>
                <th>Desc</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
      {panoramas.map((viaje) => (
              <tr>
                <td>{viaje.nombre}</td>
                <td>{viaje.desc}</td>
                <td>
                {(currentUser.id == viaje.userId || currentUser.admin) ? (
                          <span>
                            <button><a href={`/panoramas/${viaje.id}`}>EDITAR PANORAMA</a></button>
                            <button onClick={() => handleRemovePanorama(viaje.id)} >BORRAR</button>
 
                          </span>
                          ) : ( <p></p> )}
                </td>
                
              </tr>
            ))}
        </tbody>
    </table>
    <CreateReserva addReserva={addReserva} />
    <h1 class='title has-text-light'>RESERVAS</h1>
    <table class='table is-bordered is-striped is-fullwidth '>
        <thead class='mr-5 ml-5'>
            <tr>
                <th>ID Usuario</th>
            </tr>
        </thead>
        <tbody>
      
      {reservas.map((viaje) => (
              <tr>
                <td>{viaje.userId}</td>
                {(currentUser.id == viaje.userId || currentUser.admin) ? (
                          <span>
                            <button onClick={() => handleRemoveReserva(viaje.id)} >ANULAR RESERVA</button>

                          </span>
                          ) : ( <p></p> )}
              </tr>
            ))}
        </tbody>
    </table>
    </div>

      <br />
      <div>
        <button onClick={() => navigate(-1)} type="button" className="button">Back</button>
      </div>
    </section>  
  
  )
}

export default ViajeDetail;
