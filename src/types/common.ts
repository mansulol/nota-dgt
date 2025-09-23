export type noteType = {
  nifNie: string;
  clasePermiso: string;
  fechaNacimiento: string;
  fechaExamen: string;
};

export type examResult = {
  nombreApellidos: string;
  nifNie: string;
  clasePermiso: string;
  tipoPrueba: string;
  fechaExamen: string;
  calificacionExamen: string;
  numeroErrores?: number | null;
  faltas?: {
    clavesEliminatorias: string[];
    clavesDeficientes: string[];
    clavesLeves: string[];
  };
};
