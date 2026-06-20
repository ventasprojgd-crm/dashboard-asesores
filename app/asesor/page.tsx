"use client";

import { useState, useEffect } from "react";

export default function AsesorPage() {

  const [vista, setVista] = useState("dashboard");
  
const [dashboard, setDashboard] = useState<any>({
    
  ordenes: 0,
  enviadas: 0,
  entregadas: 0,
  devoluciones: 0,
  comisionPendiente: 0,
  comisionPagada: 0,
});
async function guardarLead(lead: any) {

  const tipificacion =
    (
      document.getElementById(
        `tipificacion-${lead.id}`
      ) as HTMLSelectElement
    ).value;

  const comentario =
    (
      document.getElementById(
        `comentario-${lead.id}`
      ) as HTMLInputElement
    ).value;

  await fetch(
  "https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec",
  {
    method: "POST",
    body: JSON.stringify({
      id: lead.id,
      tipificacion,
      comentario,
    }),
  }
);

alert("Lead guardado correctamente");
}
const [leads, setLeads] = useState<any[]>([]);
const [ordenes, setOrdenes] = useState<any[]>([])
const [mostrarFormulario, setMostrarFormulario] = useState(false);

const [leadSeleccionado, setLeadSeleccionado] = useState<any>(null);
useEffect(() => {

  if (leadSeleccionado) {
    setMostrarFormulario(true);
  }

}, [leadSeleccionado]);
async function cargarDashboard() {
 

  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec?api=dashboard&asesor=JOSE"
  );

  const data = await res.json();
  console.log(data);

  setDashboard(data);

}
useEffect(() => {

  cargarDashboard();

  const intervalo = setInterval(() => {
    cargarDashboard();
  }, 10000);

  return () => clearInterval(intervalo);

}, []);
async function cargarOrdenes() {

  const asesor = localStorage.getItem("asesor");
  alert(asesor);
  console.log("ASESOR:", asesor);
  window.open(
  `https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec?api=ordenes&asesor=${asesor}`
);

 const res = await fetch(
  `https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec?api=ordenes&asesor=${asesor}`,
 
);

console.log(res);

  const data = await res.json();

  console.log("ORDENES:", data);

  setOrdenes(data);

}
async function cargarLeads() {
    async function guardarLead(
  id: number,
  tipificacion: string,
  comentario: string
) {

  await fetch(
    `https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec/exec?api=guardarLead&id=${id}&tipificacion=${encodeURIComponent(tipificacion)}&comentario=${encodeURIComponent(comentario)}`
  );

  cargarLeads();

}

  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec?api=leads&asesor=JOSE"
  );

  const data = await res.json();

  console.log(data);

  setLeads(data);

}
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#eef2f7",
      }}
    >
      {/* MENU IZQUIERDO */}
      <aside
        style={{
          width: "260px",
          background: "#0f172a",
          color: "white",
          padding: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          CRM ASESORES
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <button
  style={{
    ...btn,
    background:
      vista === "dashboard"
        ? "#2563eb"
        : "#1e293b",
  }}

  onClick={() => setVista("dashboard")}
>
  📊 Dashboard
</button>

<button
  style={btn}
  onClick={() => {
    setVista("leads");
    cargarLeads();
  }}
>
  📋 Leads
</button>
<button
  onClick={() => {
    localStorage.removeItem("asesor");
    window.location.href = "/login";
  }}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%",
    fontWeight: "600",
  }}
>
  🚪 Cerrar Sesión
</button>


      </div>
</aside>  
      {/* CONTENIDO */}
      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <div
  style={{
    width: "100%",
    height: "130px",
    background:
      "linear-gradient(135deg,#ffffff,#f0fdf4)",
    borderRadius: "20px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    padding: "20px 30px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,.08)",
  }}
>
  <img
    src="/logo.jpeg"
    alt="Bionatural"
    style={{
      height: "90px",
      objectFit: "contain",
    }}
  />

  <div
    style={{
      marginLeft: "20px",
    }}
  >
    <h2
      style={{
        margin: 0,
        color: "#166534",
        fontSize: "38px",
        fontWeight: "800",
      }}
    >
      Bionatural J&G
    </h2>

    <p
      style={{
        margin: 0,
        color: "#64748b",
        fontSize: "18px",
      }}
    >
      Salud y Calidad de Vida
    </p>
  </div>
</div>
        <h1
  style={{
    fontSize: "48px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px",
  }}
>
          Dashboard Asesor
        </h1>

        <p
  style={{
    color: "#334155",
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "30px",
  }}
>
          Bienvenido José
        </p>
        <p>
  Bienvenido José
</p>

<button
  onClick={() =>
    window.open(
      "https://docs.google.com/spreadsheets/d/1Pc7He6m_Q6Bk6S2tH92CIW8ctyqD183mw7YInELNk9g/edit?gid=0#gid=0",
      "_blank"
    )
  }
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "15px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "25px",
  }}
>
  📦 Mis Órdenes
</button>
<button
  onClick={() =>
    window.open(
      "https://drive.google.com/drive/folders/1C5_oznx2YZG_ti0j_qx_q_9Ct3mDLaQe?usp=sharing",
      "_blank"
    )
  }
  style={{
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "white",
    border: "none",
    padding: "15px 25px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "25px",
    marginLeft: "15px",
    boxShadow: "0 8px 20px rgba(34,197,94,.35)",
  }}
>
  📚 Material de Apoyo
</button>
        {/* DASHBOARD */}
        {vista === "dashboard" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
            }}
          >
            

<Card titulo="📦 Órdenes" valor={String(dashboard.ordenes)} />

<Card titulo="🚚 Enviadas" valor={String(dashboard.enviadas)} />

<Card titulo="✅ Entregadas" valor={String(dashboard.entregadas)} />

<Card titulo="🔴 Devoluciones" valor={String(dashboard.devoluciones)} />

<div
  style={{
    background: "linear-gradient(135deg,#fff8e1,#fef3c7)",
    border: "2px solid #fbbf24",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 10px 25px rgba(251,191,36,.25)",
    position: "relative",
    overflow: "hidden",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "20px",
    }}
  >
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#fef3c7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
      }}
    >
      💰
    </div>

    <div>
      <h3
        style={{
          margin: 0,
          color: "#78350f",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        Comisión Pendiente
      </h3>

      <small
        style={{
          color: "#92400e",
          fontWeight: "600",
        }}
      >
        Tu saldo acumulado
      </small>
    </div>
  </div>

  <div
    style={{
      fontSize: "48px",
      fontWeight: "800",
      color: "#ea580c",
      marginBottom: "15px",
    }}
  >
    ${dashboard.comisionPendiente}
  </div>

  <div
    style={{
      background: "#fef3c7",
      padding: "10px",
      borderRadius: "12px",
      textAlign: "center",
      color: "#92400e",
      fontWeight: "600",
    }}
  >
    📈 Sigue así, vas por buen camino
  </div>
</div>

<Card
  titulo="💵 Ventas Pagadas"
  valor={String(dashboard.pagadas)}
/>


</div>
)}

        {/* LEADS */}
        {vista === "leads" && (
          <div
  style={{
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    maxWidth: "1200px",
  }}
>
            <h2
  style={{
    color: "#0f172a",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
  }}
>
  📋 Leads Asignados
</h2>

            <table
  style={{
    width: "100%",
    marginTop: "20px",
    
  }}
>

              <thead>
                <tr>
                    
                  <th style={{ color: "#111827", fontWeight: "700" }}>Nombre</th>
<th style={{ color: "#111827", fontWeight: "700" }}>Teléfono</th>
<th style={{ color: "#111827", fontWeight: "700" }}>Producto</th>
<th style={{ color: "#111827", fontWeight: "700" }}>Tipificación</th>
<th style={{ color: "#111827", fontWeight: "700" }}>Comentario</th>
<th style={{ color: "#111827", fontWeight: "700" }}>Acción</th>
                  
                </tr>
              </thead>

              <tbody>
                {leads.map((lead: any, index: number) => (
  
 <tr
  key={index}
  style={{
    borderBottom: "1px solid #e5e7eb",
    height: "75px",
    verticalAlign: "middle",
    textAlign: "center",
  }}
>
  <td>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "12px",
    }}
  >
    <div
      style={{
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#2563eb",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {lead.nombre?.charAt(0)}
    </div>

    <strong style={{ color: "#111827" }}>
  {lead.nombre}
</strong>
  </div>
</td>
    <td style={{ color: "#111827", fontWeight: "500" }}>
  {lead.telefono}
</td>
    <td>
  <span
    style={{
      background: "#dbeafe",
      color: "#1d4ed8",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
    {lead.producto}
  </span>
</td>
    

<td>
<select
    
  id={`tipificacion-${lead.id}`}
  defaultValue={lead.tipificacion || "PENDIENTE"}
  onChange={(e) => {
  if (e.target.value === "PENDIENTE") {
    e.target.style.background = "#0f172a";
    e.target.style.color = "#ffffff";
  } else {
    e.target.style.background = "#ffffff";
    e.target.style.color = "#111827";
  }

  console.log("TIPIFICACION:", e.target.value);
}}
    style={{
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background:
  lead.tipificacion && lead.tipificacion !== "PENDIENTE"
    ? "#ffffff"
    : "#0f172a",
  color:
  lead.tipificacion && lead.tipificacion !== "PENDIENTE"
    ? "#111827"
    : "#ffffff",
  fontSize: "13px",
  fontWeight: "600",
  width: "160px"
}}
  >
    <option value="PENDIENTE">PENDIENTE</option>
    <option value="AGENDADO">AGENDADO</option>
    <option value="VENTA">VENTA</option>
    <option value="NO VENTA">NO VENTA</option>
    <option value="NO CONTESTA">NO CONTESTA</option>
    <option value="NUMERO SIN CONEXION">NUMERO SIN CONEXION</option>
    <option value="NO LLAMAR MAS">NO LLAMAR MAS</option>
  </select>
</td>
<td>

  <input
  type="text"
  id={`comentario-${lead.id}`}
  defaultValue={lead.comentario}
  onChange={(e) => {
  e.target.style.background =
    e.target.value.trim() !== "" ? "#ffffff" : "#0f172a";

  e.target.style.color =
    e.target.value.trim() !== "" ? "#111827" : "#ffffff";
}}
  placeholder="Escribir comentario..."
  style={{
    width: "180px",
    padding: "8px",
    borderRadius: "8px",
    border: lead.comentario
      ? "1px solid #d1d5db"
      : "1px solid #475569",
    background: lead.comentario
      ? "#ffffff"
      : "#0f172a",
    color: lead.comentario
      ? "#111827"
      : "#ffffff",
    fontWeight: "500",
  }}
/>
</td>
    <td>
      <div
  style={{
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  }}
>
  <button
  style={accionBtn}
  onClick={() => {
    setLeadSeleccionado(lead);
    setMostrarFormulario(true);
  }}
>
  Crear Venta
</button>

  <button
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
  onClick={() => guardarLead(lead)}
>
  💾 Guardar
</button>
</div>
    </td>
  </tr>
))}
              </tbody>
            </table>
          </div>
        )}
        {mostrarFormulario && leadSeleccionado && (

<div
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    position: "fixed",
    top: "120px",
    right: "20px",
    width: "350px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    zIndex: 999,
  }}
>
<button
  onClick={() => setMostrarFormulario(false)}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    float: "right",
  }}
>
  ✕
</button>
  <h2 style={{ color: "#111827" }}>
📦 Crear Orden
</h2>

<h3 style={{ color: "#111827" }}>
📋 Información del Cliente
</h3>

  <h3 style={{ marginBottom: "15px" }}>
  
</h3>

<p style={{ color: "#111827" }}>
  <b>Nombre Cliente:</b> {leadSeleccionado.nombre}
</p>

<p style={{ color: "#111827" }}>
  <b>Teléfono:</b> {leadSeleccionado.telefono}
</p>

<p style={{ color: "#111827" }}>
  <b>Producto:</b> {leadSeleccionado.producto}
</p>
<input
  id="nombreCliente"
  defaultValue={leadSeleccionado.nombre}
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

  <hr style={{ margin: "15px 0" }} />

<input
  placeholder="Ciudad"
  id="ciudad"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

<input
  placeholder="Departamento"
  id="departamento"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

<input
  placeholder="Dirección"
  id="direccion"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

<input
  placeholder="Barrio"
  id="barrio"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

<input
  placeholder="Punto de referencia"
  id="referencia"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

<input
  placeholder="Cantidad"
  id="cantidad"
  type="number"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>

<input
  placeholder="Valor Venta"
  id="valorVenta"
  type="number"
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#111827",
  fontWeight: "500",
}}
/>
<button
  style={{
    width: "100%",
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "10px",
  }}
>
  <button
  onClick={async () => {
    


    const nombre =
      (document.getElementById("nombreCliente") as HTMLInputElement).value;

    const producto = leadSeleccionado.producto;

    const ciudad =
      (document.getElementById("ciudad") as HTMLInputElement).value;

    const departamento =
      (document.getElementById("departamento") as HTMLInputElement).value;

    const direccion =
      (document.getElementById("direccion") as HTMLInputElement).value;

    const barrio =
      (document.getElementById("barrio") as HTMLInputElement).value;

    const referencia =
      (document.getElementById("referencia") as HTMLInputElement).value;

    const cantidad =
      (document.getElementById("cantidad") as HTMLInputElement).value;

    const valorVenta =
      (document.getElementById("valorVenta") as HTMLInputElement).value;
      

    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec",
      {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
          tipo: "ORDEN",
          asesor: leadSeleccionado.asesor,
          nombre,
          telefono: leadSeleccionado.telefono,
          producto,
          cantidad,
          valorVenta,
          ciudad,
          departamento,
          direccion,
          barrio,
          referencia,
        }),
      }
    );
    


    alert("✅ Orden creada correctamente");

    setMostrarFormulario(false);

  }}

  style={{
    width: "100%",
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "10px",
  }}
>
  📦 Enviar Orden
</button>
</button>

</div>

)}

        {/* ORDENES */}
        {vista === "ordenes" && (
          <CajaTitulo titulo="📦 Órdenes" />
        )}

        {/* ENVIADAS */}
        {vista === "enviadas" && (
          <CajaTitulo titulo="🚚 Órdenes Enviadas" />
        )}

        {/* ENTREGADAS */}
        {vista === "entregadas" && (
          <CajaTitulo titulo="✅ Órdenes Entregadas" />
        )}

        {/* DEVOLUCIONES */}
        {vista === "devoluciones" && (
          <CajaTitulo titulo="🔴 Devoluciones" />
        )}

        {/* COMISIONES */}
        {vista === "comisiones" && (
          <CajaTitulo titulo="💰 Comisiones" />
        )}

        {/* BONO */}
        {vista === "bono" && (
          <CajaTitulo titulo="📱 Bono Conexion" />
        )}
      </main>
    </div>
  );
}

function CajaTitulo({
  titulo,
}: {
  titulo: string;
}) {
    
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
      }}
    >
      <h2>{titulo}</h2>
    </div>
  );
}

function Card({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div
  style={{
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 12px 30px rgba(0,0,0,.08)",
    border: "1px solid #e2e8f0",
  }}
>
      <h3
  style={{
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  }}
>
  {titulo}
</h3>

      <h1
        style={{
  marginTop: "20px",
  fontSize: "42px",
  fontWeight: "700",
  color: "#15803d",
  marginBottom: 0,
}}
      >
        {valor}
      </h1>
    </div>
  );
}

const btn = {
  background: "#1e293b",
  color: "#ffffff",
  border: "1px solid #334155",
  padding: "16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "left" as const,
};

const accionBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};