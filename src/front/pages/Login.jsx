import React, { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password', '')


  const capturaDatos = async (info) => {

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        localStorage.setItem("jwt-token", data.token); // JWT
        localStorage.setItem("user_id", data.user_id); 
        window.dispatchEvent(new Event("storage"));   // ID de usuario
        navigate("/private");
      } else {
        alert(data.msg || "Error al iniciar sesión");
      }
    } catch (error) {
      console.log(error);
      alert("Error de conexión");
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(capturaDatos)}>
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Correo Electrónico</label>
                <input type="email" className={"form-control " + (errors.email ? 'is-invalid' : '')}
                  id="loginEmail"
                  {
                  ...register('email', {
                    required: 'Your email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email is invalid!'
                    }
                  })
                  }
                />
                <div className="invalid-feedback">
                  {errors?.email?.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className={"form-control " + (errors.password ? 'is-invalid' : '')}
                  id="password"

                  {
                  ...register('password', {
                    required: 'Password is required!',

                  })
                  }
                />
                <div className="invalid-feedback">
                  {errors?.password?.message}
                </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
    </div>
  );
};
