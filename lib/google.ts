import axios from "axios";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx_J4Ia1iyTEm1ln2vZR2HKfNzN8FVy21VjmLVS9M8cD4eeCPlcl-wt02ijb1XRfAhY/exec";

export async function loginUsuario(
  usuario: string,
  clave: string
) {
  try {
    const response = await axios.get(
      `${GOOGLE_SCRIPT_URL}?api=login&usuario=${usuario}&clave=${clave}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtenerLeads(
  asesor: string
) {
  try {
    const response = await axios.get(
      `${GOOGLE_SCRIPT_URL}?api=leads&asesor=${asesor}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function obtenerOrdenes(
  asesor: string
) {
  try {
    const response = await axios.get(
      `${GOOGLE_SCRIPT_URL}?api=ordenes&asesor=${asesor}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}