import React, { useState } from "react";
import Device from "./Device";
import Admin from "./Admin";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📍 Rastreador de PDA</h1>
      
      {/* Botão para alternar modo admin/usuário */}
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "Mudar para Usuário" : "Mudar para Admin"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {isAdmin ? <Admin /> : <Device />}
      </div>
    </div>
  );
}
