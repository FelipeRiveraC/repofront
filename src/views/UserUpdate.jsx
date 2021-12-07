/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';
import { Link, useParams, useNavigate } from "react-router-dom";


const initialValues = {
  email: '',
  password: '',
  edad: '',
  username: '',
  name: ''
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
    fetch(`${process.env.REACT_APP_API_URL}/api/user/edit/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return response.text().then((message) => Promise.reject(new Error(message)));
        } 
        if (response.ok) { navigate(`/usuarios/${id}`)}
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
    () => !(values.nombre && values.cupos && values.fecha && !loading),
    [values, loading],
  );

  return (
    <div class='container  is-max-desktop has-text-centered '>
      <h1 class='title has-text-dark'>EDITAR USUARIO</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="email">Nombre:</label>
          <input
            class='input'
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            class='input'
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Edad:</label>
          <input
            class='input'
            type="number"
            id="edad"
            name="edad"
            value={values.edad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            class='input'
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            class='input'
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div><br />
          <button class='button' type="submit" disabled={!(values.email && values.password)}>Enviar</button>
        </div>

      </form>
    </div>
  );
}