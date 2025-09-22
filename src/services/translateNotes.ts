type code = {
    code: string;
    value: string;
}


function translateNotes(notes: string[]){
    const translatedNotes: string[] = [];
    notes.forEach(note => {
        const found = codes.find(c => c.code === note);
        if(found){
            translatedNotes.push(`${found.code} - ${found.value}`);
        } else {
            translatedNotes.push(note);
        }
    });

    return translatedNotes;
    
}

export default translateNotes;

const codes: code[] = [
  { code: "1.1", value: "Generales" },
  { code: "1.2", value: "Específicas" },
  { code: "2.1", value: "Asiento" },
  { code: "2.2", value: "Espejos" },
  { code: "2.3", value: "Cinturón" },
  { code: "2.4", value: "Casco" },
  { code: "2.5", value: "Tacógrafo" },
  { code: "2.6", value: "Otros" },
  { code: "3.1", value: "Observación" },
  { code: "3.2", value: "Señalización" },
  { code: "3.3", value: "Ejecución" },
  { code: "4.1", value: "Carril adecuado" },
  { code: "4.2", value: "Separación frontal" },
  { code: "4.3", value: "Separación lateral" },
  { code: "4.4", value: "Velocidad adaptada tráfico/vía" },
  { code: "4.5", value: "Velocidades máximas" },
  { code: "4.6", value: "Observación" },
  { code: "5.1", value: "Observación" },
  { code: "5.2", value: "Señalización" },
  { code: "5.3", value: "Ejecución" },
  { code: "6.1", value: "Posición con el vehículo precedente" },
  { code: "6.2", value: "Velocidad" },
  { code: "6.3", value: "Observación y valoración" },
  { code: "6.4.1", value: "Observación" },
  { code: "6.4.2", value: "Señalización" },
  { code: "6.4.3", value: "Ejecución" },
  { code: "6.5", value: "Permitir el adelantamiento" },
  { code: "6.6", value: "Adelantar por la derecha" },
  { code: "7.1", value: "Observaciones" },
  { code: "7.2", value: "Señalización" },
  { code: "7.3", value: "Posición" },
  { code: "7.4", value: "Velocidad" },
  { code: "7.5", value: "Detención" },
  { code: "7.6", value: "Reanudación" },
  { code: "8.1", value: "Observación y valoración" },
  { code: "8.2", value: "Señalización" },
  { code: "8.3", value: "Selección del lugar" },
  { code: "8.4", value: "Ejecución" },
  { code: "9.1", value: "Observación" },
  { code: "9.2", value: "Señalización" },
  { code: "9.3", value: "Selección del lugar" },
  { code: "9.4", value: "Ejecución" },
  { code: "11.1", value: "Agentes" },
  { code: "11.2", value: "Balizamiento" },
  { code: "11.3", value: "Semáforos" },
  { code: "11.4", value: "Verticales" },
  { code: "11.5.1", value: "Marcas blancas longitudinales" },
  { code: "11.5.2", value: "Marcas blancas transversales" },
  { code: "11.5.3", value: "Señales horizontales de circulación" },
  { code: "11.5.4", value: "Otras marcas e inscripciones de color blanco" },
  { code: "11.5.5", value: "Marcas de otros colores" },
  { code: "12.1", value: "Utilización mandos" },
  { code: "12.2", value: "Posición" },
  { code: "12.3", value: "Cruce" },
  { code: "12.4", value: "Carretera" },
  { code: "12.5", value: "Antiniebla" },
  { code: "12.6", value: "Emergencia" },
  { code: "13.1.1", value: "Puesta en marcha" },
  { code: "13.1.2", value: "Embrague" },
  { code: "13.1.3", value: "Freno de servicio" },
  { code: "13.1.4", value: "Acelerador" },
  { code: "13.1.5", value: "Caja de velocidades" },
  { code: "13.1.6", value: "Freno de estacionamiento" },
  { code: "13.1.7", value: "Volante" },
  { code: "13.1.8", value: "Conducción eficiente" },
  { code: "13.2.1", value: "Embrague/freno" },
  { code: "13.2.2", value: "Embrague/acelerador" },
  { code: "13.2.3", value: "Embrague/caja de velocidades" },
  { code: "13.2.4", value: "Embrague/dirección" },
  { code: "13.2.5", value: "Freno/dirección" },
  { code: "13.2.6", value: "Acelerador/caja de velocidades" },
  { code: "14.1", value: "Limpia/lavaparabrisas" },
  { code: "14.2", value: "Señales acústicas" },
  { code: "14.3", value: "Relacionados con la seguridad" },
  { code: "14.4", value: "Relacionados con la visibilidad" },
  { code: "15.1.1", value: "Accidente" },
  { code: "15.1.2", value: "Maniobra o actuación evasiva" },
  { code: "15.1.3", value: "Falta de visibilidad" },
  { code: "15.1.4", value: "Pérdida de dominio" },
  { code: "15.1.5", value: "Caída de la motocicleta" },
  { code: "15.1.6", value: "Intervención del profesor" },
  { code: "15.2", value: "Bordillo" },
  { code: "15.3", value: "No seguir las indicaciones del examinador" },
];