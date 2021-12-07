import React from 'react';
import Navbar from './components/Navbar';
import ViajesList from './views/ViajesList';
import ViajeDetail from './views/ViajeDetail';
import UsersList from './views/UsersList';
import NotFound from './views/NotFound';
import UserDetail from './views/UserDetail';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import Home from './views/Home';
import AuthContextProvider from './contexts/AuthContext';
import Login from './views/Login';
import Register from './views/Register'
import ViajeUpdate from './views/ViajeUpdate'
import UserUpdate from './views/UserUpdate'
import PanoramaUpdate from './views/PanoramaUpdate'
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <main>
          <Routes>
            <Route index element={<Home/>} />
            <Route path="viajes" element={<ViajesList/>} />
            <Route path="viajes/:id" element={<ViajeDetail/>} />
            <Route path="viajes/edit/:id" element={<ViajeUpdate/>} />
            <Route path="usuarios" element={<UsersList/>} />
            <Route path="usuarios/:id" element={<UserDetail/>} />
            <Route path="usuarios/edit/:id" element={<UserUpdate/>} />
            <Route path="panoramas/:id" element={<PanoramaUpdate/>} />
            <Route path='*' element={<NotFound/>} />
            <Route path="login"  element={<Login/>} />
            <Route path="register"  element={<Register/>} />
          </Routes>
        </main>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
