"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUsuario } from "@/lib/google";

export default function LoginPage() {

  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  async function ingresar() {

    const respuesta =
      await loginUsuario(
        usuario,
        clave
      );

    if (
      respuesta &&
      respuesta.success
    ) {

      localStorage.setItem(
        "asesor",
        respuesta.nombre
      );

      router.push(
        "/asesor"
      );

      return;
    }

    alert(
      "Usuario o clave incorrecta"
    );

  }

  return (

    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px"
        }}
      >

        <h1>
          CRM ASESORES
        </h1>

        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e)=>
            setUsuario(
              e.target.value
            )
          }
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px"
          }}
        />

        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e)=>
            setClave(
              e.target.value
            )
          }
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"10px"
          }}
        />

        <button
          onClick={ingresar}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px",
            background:"#15803d",
            color:"white",
            border:"none"
          }}
        >
          INGRESAR
        </button>

      </div>

    </main>

  );
}