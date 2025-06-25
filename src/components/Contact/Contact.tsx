import { useState } from "react";
import emailjs from "emailjs-com";

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

  return (
    <section id="contacto" className="!mt-1" aria-label="Formulario de contacto" tabIndex={-1}>
      <h2 className="text-3xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent select-none">
        Contáctame
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-cyan-900 bg-opacity-30 glass-card p-10 rounded-xl shadow-lg space-y-8"
        noValidate
      >
        <div>
          <label htmlFor="nombre" className="block mb-2 font-semibold text-teal-300">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full rounded-md border border-cyan-700 bg-cyan-950 bg-opacity-40 px-4 py-3 text-white placeholder-cyan-400 focus:outline-none focus:border-teal-400 focus:ring-0"
          />
          {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-teal-300">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            className="w-full rounded-md border border-cyan-700 bg-cyan-950 bg-opacity-40 px-4 py-3 text-white placeholder-cyan-400 focus:outline-none focus:border-teal-400 focus:ring-0"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="mensaje" className="block mb-2 font-semibold text-teal-300">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            className="w-full rounded-md border border-cyan-700 bg-cyan-950 bg-opacity-40 px-4 py-3 text-white placeholder-cyan-400 focus:outline-none focus:border-teal-400 focus:ring-0"
          />
          {errors.mensaje && <p className="text-red-400 text-sm mt-1">{errors.mensaje}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-center"
          aria-label="Enviar mensaje de contacto"
        >
          {loading ? "Enviando..." : "Enviar Mensaje"}
        </button>

        {enviado && (
          <p className="text-green-400 text-center mt-4">¡Mensaje enviado con éxito!</p>
        )}
      </form>
    </section>
  );
}
