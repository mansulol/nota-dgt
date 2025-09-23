import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-bg">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Política de Privacidad</h1>
              <p className="text-sm text-muted-foreground">Portal de Exámenes DGT</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <section>
            <h1 className="text-3xl font-bold text-foreground mb-6">Introducción</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Esta <span className="text-blue-600 font-semibold">Política de Privacidad</span> describe cómo la aplicación "<span className="text-blue-600 font-semibold">Mi Nota DGT</span>" recopila, utiliza y protege la información de los usuarios. Al utilizar esta aplicación, usted acepta las prácticas descritas en esta política.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Información que Recopilamos</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              La aplicación "<span className="text-blue-600 font-semibold">Nota DGT</span>" <span className="text-blue-600 font-semibold">no recopila, almacena ni procesa</span> ningún tipo de información personal de los usuarios. No se requiere registro, inicio de sesión ni cualquier forma de identificación. La aplicación opera de manera anónima y no guarda datos relacionados con el usuario en ningún momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Uso de la Información</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Dado que no se recopila información personal, no se realiza ningún uso de datos de usuario. La aplicación se limita a proporcionar consultas basadas en <span className="text-blue-600 font-semibold">scraping web</span> para fines de consulta personal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Scraping Web y Legalidad</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              La aplicación realiza <span className="text-blue-600 font-semibold">scraping</span> de datos públicos disponibles en la página web oficial de la <span className="text-blue-600 font-semibold">Dirección General de Tráfico (DGT)</span> de España. Este scraping se realiza exclusivamente para consultas personales y no comerciales, con el propósito de facilitar el acceso a información pública.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              El scraping de datos públicos para uso personal no viola las leyes de protección de datos aplicables, como el <span className="text-blue-600 font-semibold">Reglamento General de Protección de Datos (RGPD)</span> de la Unión Europea, siempre y cuando no se infrinjan términos de servicio específicos o se realice de manera abusiva.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              La aplicación no almacena, distribuye ni monetiza los datos obtenidos. Si el usuario tiene dudas sobre la legalidad, se recomienda consultar con un profesional legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">No Almacenamiento de Información</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              La aplicación <span className="text-blue-600 font-semibold">no guarda información del usuario</span> de ningún tipo, incluyendo datos de consultas anteriores, preferencias o cualquier otro dato personal. Todas las operaciones se realizan en tiempo real y no se mantienen registros persistentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Oficialidad</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Esta aplicación <span className="text-blue-600 font-semibold">no es oficial</span> ni está afiliada a la <span className="text-blue-600 font-semibold">Dirección General de Tráfico (DGT)</span> de España ni a ninguna entidad gubernamental. Es un proyecto independiente desarrollado para facilitar consultas personales y no representa ni está respaldada por autoridades oficiales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Seguridad</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Dado que no se recopila ni almacena información personal, no existen riesgos asociados con la seguridad de datos. Sin embargo, recomendamos el uso de conexiones seguras y prácticas de seguridad estándar al acceder a aplicaciones web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Derechos del Usuario</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Como no se recopila información personal, no se aplican derechos tradicionales de acceso, rectificación o eliminación de datos. Los usuarios pueden dejar de usar la aplicación en cualquier momento sin consecuencias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Aviso Legal</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Esta Política de Privacidad se basa en las normativas y guías de protección de datos aplicables en España y la Unión Europea. Para conocer más sobre sus derechos y el marco legal, consulte los siguientes recursos oficiales:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed text-muted-foreground">
              <li>
                <a href="https://www.aepd.es/guias/guia-proteccion-datos-por-defecto.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Guía de Protección de Datos por Defecto de la Agencia Española de Protección de Datos (AEPD)
                </a>: Proporciona orientaciones sobre el tratamiento de datos personales por defecto.
              </li>
              <li>
                <a href="https://www.boe.es/doue/2016/119/L00001-00088.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)
                </a>: El marco legal principal para la protección de datos personales en la Unión Europea.
              </li>
              <li>
                <a href="https://sedeaepd.gob.es/sede-electronica-web/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Sede Electrónica de la Agencia Española de Protección de Datos (AEPD)
                </a>: Portal oficial para ejercer derechos, presentar reclamaciones y obtener información adicional sobre protección de datos.
              </li>
            </ul>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              Recomendamos revisar estos documentos para una comprensión completa de sus derechos bajo la legislación de protección de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contacto</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Si tiene preguntas sobre esta Política de Privacidad, puede contactar con el desarrollador en GitHub.
            </p>
          </section>

          <section>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              Desarrollador: <span className="text-blue-600 font-semibold">Mansour Lo Lo</span> (<a href="https://github.com/mansulol" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/mansulol</a>)
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-4">
        <div className="container mx-auto px-4 gap-2 flex justify-center text-center">
          <a href="/" className="text-sm text-blue-950 text-muted-foreground hover:text-foreground">Volver al inicio</a>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;