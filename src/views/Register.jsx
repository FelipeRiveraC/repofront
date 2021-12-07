/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const initialValues = {
  email: '',
  password: '',
  edad: '',
  username: '',
  name: ''
};

export default function Login() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const response = '';
  const navigate = useNavigate();
  

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const user = await response.json();
      
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
    navigate('/');
  };

  
  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  
  if (response.ok) return <Navigate to="/" />;
  return (
    <div>
      <Link to="/">Go Back</Link>
      <h2>Login with your account</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="email">Nombre:</label>
          <input
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
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={!(values.email && values.password)}>Enviar</button>
        </div>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}