import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await resp.json();
    if (resp.ok) {
      alert("Usuario creado correctamente");
      navigate("/login");
    } else {
      alert(data.msg);
    }
  };

  return (
    
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Registro</h2>

        <form onSubmit={handleSignup} noValidate>
            <div className="mb-3">
                <label htmlFor="singupEmail" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="ejemplo@correo.com" />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Contraseña" />
            </div>

            <button type="submit" className="btn btn-primary w-100" >Registrarse</button>
        </form>
    </div>
  );
};
