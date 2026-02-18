import React, { useState } from "react";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  function manejarNombre(evento) {
    setNombre(evento.target.value);
  }

  function manejarCorreo(evento) {
    setCorreo(evento.target.value);
  }

  function manejarMensaje(evento) {
    setMensaje(evento.target.value);
  }

  async function enviar() {
    if (correo === "") {
      return alert("¡Escribe un email!");
    }

    setCargando(true);
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/enviar-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre,
          email: correo,
          mensaje: mensaje,
        }),
      });

      if (respuesta.ok) {
        alert("¡Enviado con éxito!");
      }
    } catch (error) {
      alert("Error: ¿Está encendido el servidor de Python?");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="formulario">
      <input
        className="nombre"
        type="text"
        value={nombre}
        onChange={manejarNombre}
        placeholder="tu nombre"
      />
      <input
        className="email"
        type="email"
        value={correo}
        onChange={manejarCorreo}
        placeholder="tu email"
      />
      <textarea
        className="mensaje"
        type="text"
        value={mensaje}
        onChange={manejarMensaje}
        placeholder="el mensaje"
      />
      <button className="boton" onClick={enviar} disabled={cargando}>
        MANDAR
      </button>
    </div>
  );
}

export default Formulario;
