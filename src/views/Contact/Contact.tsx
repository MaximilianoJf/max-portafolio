import { default as ContactComponent } from "./components/Contact";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Card, SectionTitle } from "../../components/ui";

export default function Contact() {
    return (
        <>
            <SectionTitle>Datos de Contacto</SectionTitle>
            <section

                id="contacto"
                aria-label="Datos y formulario de contacto"
                tabIndex={-1}
                className="flex justify-center"
            >
                <Card variant="glass" className="w-3xl">
                    <Card.Body>
                        <div className=" grid text-center grid-cols-1 sm:grid-cols-2 gap-10 text-foreground">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 text-surface-foreground" />
                                    <span> majf2704@gmail.com</span>

                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-6 h-6 text-surface-foreground" />
                                    <span> +56 984741854</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-6 h-6 text-surface-foreground" />
                                    <span>Antofagasta, Chile</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Github className="w-6 h-6 text-surface-foreground" />
                                    <a
                                        href="https://www.github.com/MaximilianoJf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-muted transition-colors"
                                    >
                                        Github
                                    </a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Linkedin className="w-6 h-6 text-surface-foreground" />
                                    <a
                                        href="https://linkedin.com/in/maximiliano-alejandro-jiménez-flores-1261a1267/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-muted transition-colors"
                                    >
                                        Linkedin
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </section >
            <ContactComponent />
        </>
    );
}