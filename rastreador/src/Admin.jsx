import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Conecta ao servidor Socket.IO
const socket = io("http://localhost:3001");

export default function Admin() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    socket.on("admin:update", (data) => {
      setDevices(data);
    });

    return () => socket.off("admin:update");
  }, []);

  return (
    <div>
      <h2>👮 Painel Admin</h2>
      <ul>
        {devices.map((d, i) => (
          <li key={i}>
            Latitude: {d.latitude}, Longitude: {d.longitude}, Atualizado:{" "}
            {new Date(d.updateAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>
      <p>🗺️ Aqui você pode integrar com Google Maps ou Leaflet para exibir o mapa</p>
    </div>
  );
}
