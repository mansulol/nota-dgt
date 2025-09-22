import { ExamConsultationForm } from "@/components/ExamConsultationForm";
import { Car, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-bg">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Portal de Exámenes DGT</h1>
              <p className="text-sm text-muted-foreground">Consulta de resultados de examen de conducir</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container flex flex-col mx-auto px-4 py-8">
        <div className="text-center flex flex-col justify-center mb-12 space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-elevated">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Consulta tu Resultado
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Introduce tus datos para consultar el resultado de tu examen de conducir.
          </p>
        </div>

        <div className="w-full flex justify-center pb-12" >
          <div className="w-11/12 px-12 py-6 rounded-xl bg-gray-200" >
            <h2 className="text-2xl" ><b>¿Cuándo estará mi nota?</b></h2>
            <br />
            <br />
            <p><b>Examen teórico realizado en ordenador</b>: la misma tarde del día del examen, a partir de las 17:00.</p>
            <br />
            <p><b>Exámenes prácticos y pruebas teóricas realizadas en papel</b>: Al día siguiente del examen, a partir de las 17:00.</p>
            <br />
            <p>En caso de que no apareciera tu nota, acércate a tu autoescuela y explícales tu caso para que nos avisen del problema.</p>
          </div>
        </div>


        <ExamConsultationForm />


      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-4">
        <div className="container mx-auto px-4 gap-2 flex justify-center text-center">
          <a href="" className="text-sm text-muted-foreground hover:text-foreground">Política de privacidad</a>
          <a href="" className="text-sm text-muted-foreground hover:text-foreground">Terminos y condiciones</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;