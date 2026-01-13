import type { Project } from "../../../types";
import type { Dispatch } from "react";
import type { ProjectActions } from "../../../reducers/project-reducer";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/ui";
import { Card as GlassCard } from "../../../components/ui";
type Props = {
    projects: Project[];
    type: number;
    dispatch: Dispatch<ProjectActions>
};



export default function ProjectList({ projects, type, dispatch }: Props) {
    const navigate = useNavigate()

    return (
        <>
            <SectionTitle>{type === 1 ? "PROYECTOS DESTACADOS" : "PROYECTOS DE FORMACIÓN Y DESARROLLO"}</SectionTitle >
            <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {projects.map(project => (
                    <GlassCard
                        key={project.id}
                        variant="glass"
                        className="cursor-pointer flex flex-col h-full transition-transform hover:scale-[1.02]"
                        onClick={() => {
                            dispatch({ type: "select-project", payload: { project } });
                            navigate("/proyectos");
                        }}
                    >

                        <GlassCard.Image shape="square" className="aspect-video w-full overflow-hidden shrink-0">
                            <img
                                src={project.image}
                                alt={`Imagen del proyecto ${project.name}`}
                                className="w-full h-full object-cover border-b border-white/10"
                                loading="lazy"
                            />
                        </GlassCard.Image>


                        <GlassCard.Description className="flex flex-col flex-grow p-6">


                            <GlassCard.Tittle className="flex items-start">
                                <h3 className="text-2xl font-bold tracking-tight line-clamp-2">
                                    {project.name}
                                </h3>
                            </GlassCard.Tittle>

                            {/* Contenedor de descripción con recorte de líneas */}
                            <GlassCard.Content className="mt-2 flex-grow">
                                <p className="text-foreground text-base leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </GlassCard.Content>

                        </GlassCard.Description>
                    </GlassCard>
                ))}
            </section>
        </>
    )
}
