import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const url = "https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces";

    const headers = {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://sedeclave.dgt.gob.es",
      Referer: "https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      Priority: "u=0, i",
    };

    // Convert request body to URLSearchParams
    const bodyParams = new URLSearchParams();
    Object.keys(req.body).forEach(key => {
      bodyParams.append(key, req.body[key]);
    });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: bodyParams,
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud HTTP: ${response.status}`);
    }

    const responseData = await response.text();

    // Parsear/scrapear el HTML aquí
    const scrapedValues = scrapeText(responseData);

    // Devolver JSON
    res.status(200).json(scrapedValues);
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: error.message });
  }
}

// Función de scraping
function scrapeText(responseData) {
  const nombreApellidosMatch = responseData.match(
    /<div id="formularioResultadoNotas:j_id28" class="formCuadroIzq_big">([^<]*)<\/div>/
  );
  const nifNie = responseData.match(
    /<div id="formularioResultadoNotas:j_id36" class="formCuadroIzq_big">([^<]*)<\/div>/
  );
  const clasePermiso = responseData.match(
    /<div id="formularioResultadoNotas:j_id38:\d+:j_id46" class="formCuadroIzq_big">([^<]*)<\/div>/
  );
  const tipoPrueba = responseData.match(
    /<div id="formularioResultadoNotas:j_id38:\d+:j_id54" class="formCuadroIzq_big">([^<]*)<\/div>/
  );
  const fechaExamen = responseData.match(
    /<div id="formularioResultadoNotas:j_id38:\d+:j_id62" class="formCuadroIzq_big">([^<]*)<\/div>/
  );
  const calificacionExamen = responseData.match(
    /<div id="formularioResultadoNotas:j_id38:\d+:j_id70" class="formCuadroIzq_big">([^<]*)<\/div>/
  );
  const numeroErrores = responseData.match(
    /<div id="formularioResultadoNotas:j_id38:\d+:j_id78" class="formCuadroIzq_big">([^<]*)<\/div>/
  );

  const clavesEliminatorias = responseData.match(
    /<td headers="faltasCometidas eliminatoria">([^<]*)<\/td>/
  );
  const clavesDeficientes = responseData.match(
    /<td headers="faltasCometidas deficiente">([^<]*)<\/td>/
  );
  const clavesLeves = responseData.match(
    /<td headers="faltasCometidas leve">([^<]*)<\/td>/
  );

  const eliminatorias = [];
  const deficientes = [];
  const leves = [];

  if (
    clavesLeves &&
    clavesLeves[1].trim() &&
    clavesLeves[1] !== "Detalle no disponible"
  ) {
    leves.push(
      ...clavesLeves[1]
        .trim()
        .split("-")
        .map((e) => e.trim())
    );
  }

  if (
    clavesDeficientes &&
    clavesDeficientes[1].trim() &&
    clavesDeficientes[1] !== "Detalle no disponible"
  ) {
    deficientes.push(
      ...clavesDeficientes[1]
        .trim()
        .split("-")
        .map((e) => e.trim())
    );
  }

  if (
    clavesEliminatorias &&
    clavesEliminatorias[1].trim() &&
    clavesEliminatorias[1] !== "Detalle no disponible"
  ) {
    eliminatorias.push(
      ...clavesEliminatorias[1]
        .trim()
        .split("-")
        .map((e) => e.trim())
    );
  }

  const resultado = {
    nombreApellidos: nombreApellidosMatch ? nombreApellidosMatch[1] : null,
    nifNie: nifNie ? nifNie[1] : null,
    clasePermiso: clasePermiso ? clasePermiso[1] : null,
    tipoPrueba:
      tipoPrueba && tipoPrueba[1] && tipoPrueba[1].substring(0, 6) == "CIRCUL" ? "CIRCULACIÓN" : "TEÓRICA",
    fechaExamen: fechaExamen ? fechaExamen[1] : null,
    calificacionExamen: calificacionExamen ? calificacionExamen[1] : null,
    numeroErrores: numeroErrores ? numeroErrores[1] : null,
    faltas: {
      clavesEliminatorias: eliminatorias ? eliminatorias : null,
      clavesDeficientes: deficientes ? deficientes : null,
      clavesLeves: leves ? leves : null,
    },
  };

  if(resultado.tipoPrueba === "TEÓRICA") {
    delete resultado.faltas;
  } else {
    delete resultado.numeroErrores;
  }

  return resultado;
}