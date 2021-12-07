/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useMemo } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

const initialValues = {

  nombre: '',
  desc: '',


};

export default function CreatePanorama({ addPanorama }) {
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

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
    fetch(`${process.env.REACT_APP_API_URL}/api/panoramas/post/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return response.text().then((message) => Promise.reject(new Error(message)));
        }
        return response.json();
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
    () => !(values.nombre && values.desc  && !loading),
    [values, loading],
  );

  return (
    <div class='has-text-centered'>
      <h2 class='subtitle'>Crea un panorama!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label><br />
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
          <label htmlFor="origin">Descripcion:</label><br />
          <input
            class='input'
            type="textarea"
            id="origin"
            name="desc"
            value={values.desc}
            onChange={handleChange}
          />
        </div>
        <div><br />
          <button className="button" type="submit" disabled={isDisabled}>Create</button>
          {loading && <p>Loading...</p>}
        </div>
        {error && <p>Something went wrong, please try again later :(</p>}
      </form>
    </div>
  );
}