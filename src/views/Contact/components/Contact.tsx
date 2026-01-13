import { useState } from "react";
import emailjs from "emailjs-com";
import { Card, SectionTitle } from "../../../components/ui";


export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { nombre: "", email: "", mensaje: "" };

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Formato de correo no válido.";
      valid = false;
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await emailjs.send(
        "service_u9879ul",
        "template_a6q4814",
        {
          from_name: formData.nombre,
          from_email: formData.email,
          message: formData.mensaje,
        },
        "t_OVUdlf9T8ipc2Tl"
      );

      setEnviado(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    } finally {
      setLoading(false);
    }


  };

  const inputStyles = "w-full rounded-lg border border-foreground/30 bg-white/5 backdrop-blur-md px-4 py-3 text-foreground placeholder-foreground/20 focus:outline-none focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 transition-all";
  const labelStyles = "block mb-2 font-semibold text-foreground ml-1";

  return (
    <>
      <SectionTitle>Contáctame</SectionTitle>

      <section id="contacto" className="mt-4" aria-label="Formulario de contacto" tabIndex={-1}>
        <Card variant="glass">
          <form
            onSubmit={handleSubmit}
            className="w-full p-8 space-y-6"
            noValidate
          >
            <div>
              <label htmlFor="nombre" className={labelStyles}>Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className={inputStyles}
              />
              {errors.nombre && <p className="text-red-400 text-sm mt-1 ml-1">{errors.nombre}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelStyles}>Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className={inputStyles}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1 ml-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="mensaje" className={labelStyles}>Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                className={`${inputStyles} resize-none`}
              />
              {errors.mensaje && <p className="text-red-400 text-sm mt-1 ml-1">{errors.mensaje}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-lg cursor-pointer
                bg-white/10 backdrop-blur-md border border-foreground/20 
                text-white font-bold text-lg tracking-wide
                hover:bg-white/20 hover:border-foreground/50 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]
                active:scale-[0.98] 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10
                transition-all duration-300"
              aria-label="Enviar mensaje de contacto"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-foreground" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar Mensaje"
              )}
            </button>

            {enviado && (
              <p className="text-foreground text-center mt-4 font-medium animate-pulse">
                ¡Mensaje enviado con éxito!
              </p>
            )}
          </form>
        </Card>
      </section>
    </>
  );
}
