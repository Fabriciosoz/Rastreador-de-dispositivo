import React, { useEffect } from "react";
import { io } from "socket.io-client";

// Conecta ao servidor Socket.IO
const socket = io("http://localhost:3001");

export default function Device() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      // WatchPosition atualiza a localização em tempo real
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          socket.emit("device:location", { latitude, longitude });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return <p>📍 Enviando localização em tempo real...</p>;
}
