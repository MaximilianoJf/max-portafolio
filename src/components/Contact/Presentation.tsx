import { Download, Github } from "lucide-react"

export default function Presentation() {

  const tecnology: string[] = [
    "PHP",
    "Laravel 10",
    "JavaScript",
    "C#",
    "ASP.NET",
    "MVC",
    "SQL",
    "Livewire",
    "React"
  ];

  return (

    <section id="presentacion" aria-label="Sección de presentación personal" tabIndex={-1} className="glass-card  p-8 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
        <img 
        src="/images/photo/portafolio_photo.jpg" 
        alt="Foto profesional y sutil de perfil" 
        className="w-56 h-56 rounded-full shadow-lg object-cover flex-shrink-0" 
        loading="lazy" />

        <div className="text-center md:text-left space-y-4 text-cyan-200">
          <h2 className="text-3xl font-extrabold text-white">
            Hola, soy Maximiliano Jiménez
          </h2>
          <p className="text-lg max-w-xl leading-relaxed">
            Profesional Informático con experiencia en el desarrollo e implementación de soluciones orientadas a la gestión de servicios. He trabajado en proyectos que buscaban mejorar la organización y el seguimiento de procesos internos, contribuyendo a una gestión más ordenada y eficiente.
          </p>

          {tecnology?.map((tech, index) => (
              <span
              key={index}
              tabIndex={0}
              className="inline-block bg-cyan-900 text-cyan-200 text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-2 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              >
                {tech}
              </span>
          ))}

          <div className="flex flex-col  mt-8 sm:flex-row items-center gap-4">
            <a
              href="/cv/cv_maximiliano_jimenez_2025.pdf"
              download="cv-maximiliano-jimenez.pdf"
              className="btn-primary inline-flex items-center gap-3 max-w-max"
              aria-label="Descargar CV de Maximiliano Jiménez"
            >
              <Download className="w-4 h-4" />
              Descargar CV
            </a>

            <a
              href="https://github.com/MaximilianoJf" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 max-w-max"
              aria-label="Ir al perfil de GitHub de Maximiliano Jiménez"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
    </section>
  )
}
