import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "api/private", {
      method:"GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido o expirado");
        return res.json();
      })
      .then(data => setMessage(data.msg))
      .catch(err => {
        console.error(err);
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <h1>Área privada</h1>
      <p>{message || "Cargando..."}</p>
    </div>
  );
};
