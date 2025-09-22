import { useState, useRef, Ref } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Search, FileText, Calendar, CreditCard, Car, Share2, ImageDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import checkNote from "@/services/checkNote";
import translateNotes from "@/services/translateNotes";
import html2canvas from "html2canvas";

const formSchema = z.object({
  dni: z.string().min(8, "El DNI/NIF debe tener al menos 8 caracteres").max(9, "El DNI/NIF no puede tener más de 9 caracteres"),
  licenseClass: z.string().min(1, "Selecciona una clase de permiso"),
  examType: z.enum(["theory", "practical"], { required_error: "Selecciona el tipo de examen" }),
  birthDate: z.date({ required_error: "La fecha de nacimiento es obligatoria" }),
  examDate: z.date({ required_error: "La fecha del examen es obligatoria" }),
});

type FormData = z.infer<typeof formSchema>;

interface ExamResult {
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
}

const licenseClasses = [
  { value: "AM", label: "AM - Ciclomotores" },
  { value: "A1", label: "A1 - Motocicletas hasta 125cc" },
  { value: "A2", label: "A2 - Motocicletas hasta 35kW" },
  { value: "A", label: "A - Motocicletas sin limitación" },
  { value: "B", label: "B - Turismos" },
  { value: "C1", label: "C1 - Camiones hasta 7.500kg" },
  { value: "C", label: "C - Camiones" },
  { value: "D1", label: "D1 - Autobuses hasta 16 plazas" },
  { value: "D", label: "D - Autobuses" },
];

export function ExamConsultationForm() {
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const [shareHtml, setShareHtml] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: "",
      licenseClass: "",
      examType: "theory",
    },
  });

  const setTodayAsExamDate = () => {
    form.setValue("examDate", new Date());
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock result generation
    const passed = Math.random() > 0.3; // 70% success rate
    const theoryScore = Math.floor(Math.random() * 15) + 15; // 15-30
    const practicalScore = data.licenseClass === "AM" ? undefined : Math.floor(Math.random() * 20) + 10; // 10-30

    const mockResult: ExamResult = {
      nombreApellidos: 'Doe, John',
      nifNie: '12345678A',
      clasePermiso: 'B',
      tipoPrueba: 'CIRCULACIÓN',
      fechaExamen: '04/08/2025',
      calificacionExamen: 'NO APTO',
      numeroErrores: null,
      faltas: {
        clavesEliminatorias: [],
        clavesDeficientes: ['4.3', '4.4'],
        clavesLeves: [
          '13.1.5', '13.1.5',
          '13.1.8', '13.2.2',
          '13.2.2', '4.4',
          '5.2', '5.2', '5.2',
        ]
      }
    };

    setResult(mockResult);
    setIsLoading(false);
   };

  const resetForm = () => {
    setResult(null);
    form.reset();
  };

  const ResultCard = (result: ExamResult) => {

    return `
      <section className="bg-gray-100 p-4">
    <div className="bg-[#4b6c9d] text-white font-bold uppercase text-center py-3 px-6 mb-6 rounded-t-lg">
      RESULTADO NOTAS DE EXÁMENES
    </div>

    <div className="bg-gray-200 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Apellidos, Nombre:</span>
          <span className="ml-2 text-gray-700">Lo Lo, Mansour</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Clase de Permiso:</span>
          <span className="ml-2 text-gray-700">B</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Tipo de Prueba:</span>
          <span className="ml-2 text-gray-700">Circulación</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Fecha de Examen:</span>
          <span className="ml-2 text-gray-700">22/09/2025</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Calificación Examen:</span>
          <span className="ml-2 text-red-700 font-bold">NO APTO</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="bg-[#7f9dbb] text-white font-bold text-center py-2 px-4 mb-2">
          FALTAS COMETIDAS
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#7f9dbb] text-white font-bold text-center py-2 border-b border-gray-300">Claves Eliminatorias</th>
              <th className="bg-[#7f9dbb] text-white font-bold text-center py-2 border-b border-gray-300">Claves Deficientes</th>
              <th className="bg-[#7f9dbb] text-white font-bold text-center py-2 border-b border-gray-300">Claves Leves</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 text-center border-b border-gray-300">11.5.1</td>
              <td className="p-3 text-center border-b border-gray-300">7.6</td>
              <td className="p-3 text-center border-b border-gray-300">13.1.2 - 7.2 - 7.3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
    `;
  };

  const handleShare = async () => {
    if (result) {
      const html = ResultCard(result);
      setShareHtml(html);

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '32rem';
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 512,
        height: tempDiv.scrollHeight,
      });

      document.body.removeChild(tempDiv);

      const image = canvas.toDataURL('image/png');
      setShareImage(image);
      setShareModalOpen(true);
    }
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'resultado-examen.png';
    link.click();
  };

  const shareResult = async (dataUrl: string) => {
    if (navigator.share) {
      try {
        const blob = await fetch(dataUrl).then(r => r.blob());
        const file = new File([blob], 'resultado-examen.png', { type: 'image/png' });
        await navigator.share({
          title: 'Resultado del Examen DGT',
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
        downloadImage(dataUrl);
      }
    } else {
      downloadImage(dataUrl);
    }
  };

  if (result) {
    return (
      <div>
        <section className="w-full flex flex-col md:gap-4 lg:gap-6">
        <div className="w-full md:w-4/6 max-w-screen-xl bg-transparent mx-auto space-y-6">
          <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Resultado del Examen</CardTitle>
              <CardDescription className="text-base">
                Permiso de conducir clase {result.clasePermiso} - Examen {result.tipoPrueba}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center gap-4 flex justify-center">
                <Badge
                  variant={result.calificacionExamen === "APTO" ? "default" : "destructive"}
                  className={cn(
                    "text-lg px-6 py-2 font-semibold",
                    result.calificacionExamen === "APTO" ? "bg-success hover:bg-success/90" : ""
                  )}
                >
                  {result.calificacionExamen === "APTO" ? "✓ APTO" : "✗ NO APTO"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                    <p className="font-semibold">{result.nombreApellidos.toUpperCase()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">DNI/NIF</label>
                    <p className="font-semibold">{result.nifNie}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fecha del examen</label>
                    <p className="font-semibold">{result.fechaExamen}</p>
                  </div>
                  {result.numeroErrores !== null && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Número de errores</label>
                      <p className="font-semibold">{result.numeroErrores}</p>
                    </div>
                  )}
                </div>
              </div>
              {result.faltas && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Faltas cometidas:</h4>
                  <div className="space-y-2">

                    <div>
                      <label className="text-sm font-medium text-red-600">Graves</label>
                      <p className="font-semibold">{result.faltas.clavesEliminatorias.join(', ')}</p>
                    </div>


                    <div>
                      <label className="text-sm font-medium text-orange-600">Deficientes</label>
                      <p className="font-semibold">{result.faltas.clavesDeficientes.join(', ')}</p>
                    </div>


                    <div>
                      <label className="text-sm font-medium text-yellow-600">Leves</label>
                      <p className="font-semibold">{result.faltas.clavesLeves.join(', ')}</p>
                    </div>

                  </div>
                </div>
              )}
              <div className="pt-4 border-t flex gap-2">
                <Button onClick={handleShare} className="flex-1" variant="default">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir resultado
                </Button>
                <Button onClick={resetForm} className="flex-1" variant="outline">
                  Realizar otra consulta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6 bg-transparent pt-6 items-start justify-center" >
          <Card className="w-full lg:w-96 bg-gray-300 shadow-elevated border-0 bg-gradient-to-br from-card to-card/80" >
            <CardHeader className="text-2xl" > Faltas Eliminatorias </CardHeader>
            <CardContent className="flex flex-col gap-6" >
              {
                translateNotes(result.faltas?.clavesEliminatorias || []).map((note, index) => (
                  <span key={index}>
                    <Badge className="m-1" variant="secondary">{note}</Badge>
                  </span>
                ))
              }
            </CardContent>
          </Card>

          <Card className="w-full lg:w-96 bg-gray-200 shadow-elevated border-0 bg-gradient-to-br from-card to-card/80" >
            <CardHeader className="text-2xl" > Faltas Deficientes </CardHeader>
            <CardContent className="flex flex-col gap-6" >
              {
                translateNotes(result.faltas?.clavesDeficientes || []).map((note, index) => (
                  <span key={index}>
                    <Badge className="m-1" variant="secondary">{note}</Badge>
                  </span>
                ))
              }
            </CardContent>
          </Card>

          <Card className="w-full lg:w-96 bg-gray-200 shadow-elevated border-0 bg-gradient-to-br from-card to-card/80" >
            <CardHeader className="text-2xl" > Faltas Leves </CardHeader>
            <CardContent className="flex flex-col gap-6" >
              {
                translateNotes(result.faltas?.clavesLeves || []).map((note, index) => (
                  <span key={index}>
                    <Badge className="m-1" variant="secondary">{note}</Badge>
                  </span>
                ))
              }
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir Resultado</DialogTitle>
          </DialogHeader>
          {shareImage && (
            <div className="space-y-4">
              <img src={shareImage} alt="Resultado del examen" className="w-full rounded" />
              <div className="flex gap-2">
                <Button onClick={() => downloadImage(shareImage)} className="flex-1">
                     <ImageDown /> Descargar
                </Button>
                <Button onClick={() => shareResult(shareImage)} className="flex-1" variant="outline">
                  <Share2 /> Compartir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
    );
  }

  return (
    <div className="w-full md:w-4/6 max-w-screen-xl mx-auto">
      <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-card/80">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Consulta de Examen</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      DNI/NIF
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345678A"
                        {...field}
                        className="transition-smooth focus:shadow-lg"
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clase de permiso</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="transition-smooth focus:shadow-lg">
                          <SelectValue placeholder="Selecciona la clase de permiso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {licenseClasses.map((license) => (
                          <SelectItem key={license.value} value={license.value}>
                            {license.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal transition-smooth focus:shadow-lg",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha del examen
                    </FormLabel>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "flex-1 pl-3 text-left font-normal transition-smooth focus:shadow-lg",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={setTodayAsExamDate}
                        className="shrink-0"
                      >
                        Hoy
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-lg"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Consultando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Consultar resultado
                  </div>
                )}
              </Button>
            </form>
          </Form>
            </CardContent>
          </Card>
        </div>
  );
}