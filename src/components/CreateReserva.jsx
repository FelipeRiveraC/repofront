/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useMemo } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

const initialValues = {
};

export default function CreateReserva({ addReserva }) {
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
    fetch(`${process.env.REACT_APP_API_URL}/api/reservas/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return response.text().then((message) => Promise.reject(new Error(message)));
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, reserva) => addReserva(reserva));
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


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <button className="button" type="submit">Reservar!</button>
          {loading && <p>Loading...</p>}
        </div>
        {error && <p>Something went wrong, please try again later :(</p>}
      </form>
    </div>
  );
}