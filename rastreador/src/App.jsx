import React, {useEffect} from "react";
import { io } from "socket.io-client";
// Conecta ao servidor Node.js (ajuste se seu servidor não for localhost:3001)
const socket =io ("http://localhost:3001")

function App() {
  useEffect(() => {
    if("geolocation" in navigator){
      //solicita localização em tempo real
      navigator.geolocation.watchPosition(
        (position) =>{
        const { latitude, longitude } = position.coords;
        // Envia para o servidor
        socket.emit("device:location", {
        nome:"celular joão", 
        status:"online",
        latitude,
        longitude,});

       console.log("localização enviada", latitude, longitude);
      },
      (error) => {
        console.error("erro ao obter a localização", error);
      },
      {enableHighAccuracy: true }// mais precisão
      );
    }else{
      console.error("Geolocalização nãu suportada neste navegador.")
    }  
  }, []);
  
  return(
    <div style={{ padding: "20px" }}>
      <h1>📍 Rastreador de PDA</h1>
      <p>Este dispositivo está enviando localização em tempo real...</p>
    </div>
  );
}
export default App;
