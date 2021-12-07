/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useMemo } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

const initialValues = {
};

export default function DeletePost({ id }) {
  //const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

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
          <button type="submit" >BORRAR</button>
          {loading && <p>Loading...</p>}
        </div>
        {error && <p>Something went wrong, please try again later :(</p>}
      </form>
    </div>
  );
}