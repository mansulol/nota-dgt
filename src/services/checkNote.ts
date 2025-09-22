interface noteType{
    nifNie: string;
    clasePermiso: string ;
    fechaNacimiento: string;
    fechaExamen: string;
}

async function checkNote(values: noteType) {
  const url =
    "https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces";

  const headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "https://sedeclave.dgt.gob.es",
    Referer:
      "https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    Priority: "u=0, i",
  };

  const bodyParams = new URLSearchParams();
  bodyParams.append("formularioBusquedaNotas", "formularioBusquedaNotas");
  bodyParams.append("formularioBusquedaNotas:nifnie", values.nifNie.toUpperCase());
  bodyParams.append("formularioBusquedaNotas:fechaExamen", values.fechaExamen);
  bodyParams.append("formularioBusquedaNotas:clasepermiso", values.clasePermiso);
  bodyParams.append("formularioBusquedaNotas:fechaNacimiento",values.fechaNacimiento);
  bodyParams.append("formularioBusquedaNotas:honeypot", "");
  bodyParams.append("formularioBusquedaNotas:j_id51", "Buscar");
  bodyParams.append(
    "javax.faces.ViewState",
    "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"
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: bodyParams,
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud HTTP: ${response.status}`);
    }

    const responseData = await response.text();

    const scrapedValues = scrapeText(responseData);

    return scrapedValues;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
  }
}

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
      tipoPrueba[1].substring(0, 6) == "CIRCUL" ? "CIRCULACIÓN" : "TEÓRICA",
    fechaExamen: fechaExamen ? fechaExamen[1] : null,
    calificacionExamen: calificacionExamen ? calificacionExamen[1] : null,
    numeroErrores: numeroErrores ? numeroErrores[1] : null,
    faltas: {
      clavesEliminatorias: eliminatorias ? eliminatorias : null,
      clavesDeficientes: deficientes ? deficientes : null,
      clavesLeves: leves ? leves : null,
    },
  };

  if( resultado.tipoPrueba === "TEÓRICA" ){
    delete resultado.faltas;
  }else{
    delete resultado.numeroErrores;
  }

  return resultado;
}

module.exports = checkNote;
