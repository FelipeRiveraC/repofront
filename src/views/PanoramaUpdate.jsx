/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';
import { Link, useParams, useNavigate } from "react-router-dom";


const initialValues = {
  nombre: '',
  desc: '',

};

export default function CreateViaje({ addViaje }) {
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      body: JSON.stringify(values),
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/panoramas/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return response.text().then((message) => Promise.reject(new Error(message)));
        } 
        if (response.ok) { navigate(`/`)}
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, viaje) => addViaje(viaje));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setValues(initialValues);
        setLoading(false);
      });
  };

  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const isDisabled = useMemo(
    () => !(values.nombre && values.desc && !loading),
    [values, loading],
  );

  return (
    <div class='container  is-max-desktop has-text-centered '>
      <h1 class='title has-text-dark'>EDITAR</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            class='input'
            type="text"
            id="name"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="origin">Descripcion:</label>
          <input
            class='input'
            type="text"
            id="desc"
            name="desc"
            value={values.desc}
            onChange={handleChange}
          />
        </div>
        <div><br />
          <button class='button' type="submit" disabled={isDisabled}>Create</button>
          {loading && <p>Loading...</p>}
        </div>
        {error && <p>Something went wrong, please try again later :(</p>}
      </form>
    </div>
  );
}