import { default as ContactComponent } from "../components/Contact/Contact";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";


export default function Contact() {
  return (
    <>
      <section
      
        id="contacto"
        aria-label="Datos y formulario de contacto"
        tabIndex={-1}
        className="max-w-4xl mx-auto px-6 pt-10"
      >
        <h2 className="text-3xl font-extrabold mb-14 text-center bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent select-none">
          Datos de Contacto
        </h2>

        <div className="mb-16 grid text-center grid-cols-1 sm:grid-cols-2 gap-10 text-white">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-cyan-400" />
              <a
                href="mailto:tuemail@ejemplo.com"
                className="hover:text-teal-300 transition-colors"
              >
                majf2704@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-cyan-400" />
              <a
                href="tel:+56912345678"
                className="hover:text-teal-300 transition-colors"
              >
                +56 984741854
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-cyan-400" />
              <span>Antofagasta, Chile</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Github className="w-6 h-6 text-cyan-400" />
              <a
                href="https://github.com/tuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                github.com/MaximilianoJf
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Linkedin className="w-6 h-6 text-cyan-400" />
              <a
                href="https://linkedin.com/in/maximiliano-alejandro-jiménez-flores-1261a1267/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                Visitar Linkeding
              </a>
            </div>
          </div>
        </div>


      </section>
      <ContactComponent />  
    </>
  );
}