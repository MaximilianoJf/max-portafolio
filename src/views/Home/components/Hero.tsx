import { Github, FileText } from "lucide-react"

import { Link as GlassLink, Card as GlassCard, Badge as GlassBadge } from "../../../components/ui";

export default function Hero() {

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
        <>
            <GlassCard variant="glass">
                <GlassCard.Body>
                    <GlassCard.Image>
                        <img
                            src="/images/photo/portafolio_photo.jpg"
                            alt="Foto profesional y sutil de perfil"
                            className="w-80 h-80 shadow-lg object-cover"
                            loading="lazy" />
                    </GlassCard.Image>

                    <GlassCard.Description>
                        <GlassCard.Tittle>
                            Hola, Soy Maximiliano Jiménez
                        </GlassCard.Tittle>
                        <GlassCard.Content>
                            <p className="text-lg  leading-relaxed">
                                Profesional Informático con experiencia en el desarrollo e implementación de soluciones orientadas a la gestión de servicios. He trabajado en proyectos que buscaban mejorar la organización y el seguimiento de procesos internos, contribuyendo a una gestión más ordenada y eficiente.
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                {tecnology?.map((tech, index) => (
                                    <GlassBadge key={index}>
                                        {tech}
                                    </GlassBadge>
                                ))}
                            </div>
                        </GlassCard.Content>
                        <GlassCard.Footer>
                            <div className="flex flex-row sm:justify-start justify-center items-center gap-4 mt-2">
                                <GlassLink variant="glass" href="/cv/cv_maximiliano_jimenez_2025.pdf"
                                    download="cv-maximiliano-jimenez.pdf"
                                    aria-label="Descargar CV de Maximiliano Jiménez"
                                >
                                    <FileText /> CV
                                </GlassLink>
                                <GlassLink variant="glass"
                                    href="https://github.com/MaximilianoJf"
                                    ariaLabel="Ir al perfil de GitHub de Maximiliano Jiménez"
                                >
                                    <Github /> GitHub
                                </GlassLink>

                            </div>
                        </GlassCard.Footer>
                    </GlassCard.Description>
                </GlassCard.Body>
            </GlassCard>

        </>
    )
}
