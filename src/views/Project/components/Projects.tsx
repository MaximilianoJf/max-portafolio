import { useProject } from "../../../hooks/useProject";
import { useLocation } from "react-router-dom";
import { Play } from "lucide-react";
import { separarProyectos } from "../../../helpers/projectHelpers";
import ProjectList from "./ProjectList";
import { ExternalLink, Github } from "lucide-react"
import { useEffect } from "react";
import { Accordion } from "../../../components/ui/display/accordion/Accordion";
import { formation } from "../../../data/db";
import { Link as GlassLink, Card as GlassCard, Badge as GlassBadge } from "../../../components/ui";
export default function Projects() {

    const { state, dispatch } = useProject();
    const location = useLocation();
    const isProjectPage = location.pathname === "/proyectos"

    const { destacados, aprendizaje } = separarProyectos(state.data);


    useEffect(() => {
        localStorage.setItem('projectState', JSON.stringify(state));
    }, [state]);


    return (
        <>
            {state.selected === null ? (
                <>
                    {isProjectPage && <Accordion categories={formation} />}
                    {destacados.length > 0 && (
                        <>
                            <ProjectList projects={destacados} type={1} dispatch={dispatch} />
                        </>
                    )}
                    {aprendizaje.length > 0 && isProjectPage && (
                        <>
                            <ProjectList projects={aprendizaje} type={0} dispatch={dispatch} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className="max-w-5xl mx-auto">
                        <GlassCard variant="glass">
                            <GlassCard.Body>
                                <GlassCard.Image
                                    shape="square"
                                    className="w-full lg:w-[400px] aspect-video lg:h-[250px]"
                                >
                                    <img
                                        src={state.selected.image}
                                        alt={`Imagen del proyecto ${state.selected.name}`}

                                        className="w-full h-full object-cover rounded-xl shadow-lg"
                                        loading="lazy"
                                    />
                                </GlassCard.Image>

                                <GlassCard.Description className="w-full">

                                    <GlassCard.Tittle>{state.selected.name}</GlassCard.Tittle>

                                    <GlassCard.Content>
                                        <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
                                            {state.selected.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {state.selected.tecnology?.map((tech, index) => (
                                                <GlassBadge key={index}>{tech}</GlassBadge>
                                            ))}
                                        </div>
                                    </GlassCard.Content>

                                    <GlassCard.Footer>

                                        <div className="flex flex-wrap sm:flex-row justify-center sm:justify-start items-center gap-4 mt-4">

                                        </div>
                                    </GlassCard.Footer>
                                </GlassCard.Description>
                            </GlassCard.Body>
                        </GlassCard>

                        {state.selected.images && (
                            <div className="flex flex-wrap justify-center mt-10 gap-8 max-w-5xl mx-auto text-foreground">
                                {state.selected.images.map((img, index) => (
                                    <div key={index} className="space-y-2 text-center max-w-[300px] w-full md:w-1/3">
                                        {!img.thumbnail ? (

                                            <GlassCard variant="glass" className="flex flex-col h-full overflow-hidden p-3">
                                                <div className="aspect-video w-full overflow-hidden shrink-0 rounded-xl">
                                                    <img
                                                        src={img.src}
                                                        alt={img.alt}
                                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                                                        onClick={() => dispatch({ type: 'show-project-image', payload: { image: img } })}
                                                    />
                                                </div>
                                                <div className="p-4 flex flex-col justify-center flex-grow">
                                                    <p className="text-sm text-foreground font-medium line-clamp-2 text-center">
                                                        {img.alt}
                                                    </p>
                                                </div>
                                            </GlassCard>
                                        ) : (

                                            <GlassCard variant="glass" className="flex flex-col h-full overflow-hidden p-3">
                                                <div
                                                    className="aspect-video w-full overflow-hidden shrink-0 rounded-xl relative cursor-pointer group"
                                                    onClick={() => dispatch({ type: 'show-project-image', payload: { image: img } })}
                                                >
                                                    <img
                                                        src={img.thumbnail || '/default-video-thumbnail.png'}
                                                        alt={`Thumbnail del video: ${img.alt}`}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />

                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                                                        <div className="bg-foreground/20 backdrop-blur-sm rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform">
                                                            <Play className="w-8 h-8 text-background fill-current" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4 flex flex-col justify-center flex-grow">
                                                    <p className="text-sm text-foreground font-medium line-clamp-2 text-center">
                                                        {img.alt}
                                                    </p>
                                                </div>
                                            </GlassCard>
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );

}
