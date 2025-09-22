import { ExamConsultationForm } from "@/components/ExamConsultationForm";
import { Car, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
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
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
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
            Los resultados están disponibles inmediatamente después de la realización del examen.
          </p>
        </div>

        <ExamConsultationForm />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <Car className="w-5 h-5" />
              <span className="text-sm">Dirección General de Tráfico</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Sistema de consulta de resultados de examen de conducir
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;