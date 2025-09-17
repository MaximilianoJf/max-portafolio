import { useProject } from "../../hooks/useProject";
import { useLocation } from "react-router-dom";
import { Play } from "lucide-react";
import {separarProyectos } from "../../helpers/projectHelpers";
import ProjectList from "./ProjectList";
import { ExternalLink, Github } from "lucide-react"
import { useEffect } from "react";

export default function Projects() {

    const {state, dispatch} = useProject();
    const location = useLocation();
    const isProjectPage =  location.pathname === "/proyectos"

    const { destacados, aprendizaje } = separarProyectos(state.data);


    useEffect(() => {
        localStorage.setItem('projectState', JSON.stringify(state));
    }, [state]);


    return (
    <>
        {state.selected === null ? (
            <>
                
                <section id="proyectos" className="!mt-0" aria-label="Sección de proyectos" tabIndex={-1}>
            
                    {destacados.length > 0 && (
                        <>
                
                        <ProjectList projects={destacados} type={1} dispatch={dispatch}  />
                        
                        </>
                    )}

                    {aprendizaje.length > 0 && isProjectPage && (
                        <>
                           <ProjectList projects={aprendizaje} type={0} dispatch={dispatch}  />
                        </>
                    )}
                </section>
            </>
        ) : (
        <>
        <div className="max-w-5xl mx-auto">
            
             <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 text-cyan-200">
                <div className="md:basis-1/2 w-full flex justify-center">
                    <img
                        src={state.selected.image}
                        alt={`Imagen del proyecto ${state.selected.name}`}
                        className="w-[400px] h-[250px] rounded-lg shadow-lg object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="md:basis-1/2 w-full text-center md:text-left space-y-4">
                <h2 className="text-3xl font-extrabold text-white">
                    {state.selected.name}
                </h2>

                {state.selected.tecnology?.map((tech, index) => (
                    <span
                    key={index}
                    tabIndex={0}
                    className="inline-block bg-cyan-900 text-cyan-200 text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-2 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    >
                    {tech}
                    </span>
                ))}

                <p className="text-base max-w-xl leading-relaxed text-cyan-300">
                    {state.selected.description}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {state.selected.url && (
                        <a
                            href={state.selected.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 max-w-max"
                            aria-label={`Ver proyecto ${state.selected.name}`}
                            >
                            <ExternalLink className="w-4 h-4" />
                                Ver Proyecto
                        </a>
                    )}

                    {state.selected.github && (
                        <a
                            href={state.selected.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 max-w-max bg-black hover:bg-neutral-800"
                            aria-label={`Ver código fuente de ${state.selected.name} en GitHub`}
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                    )}
                </div>
                </div>
            </div>
         
            {state.selected.images && (
               <div className="flex flex-wrap justify-center mt-10 gap-8 max-w-5xl mx-auto text-cyan-200">
                    {state.selected.images.map((img, index) => (
                        <div key={index} className="space-y-2 text-center max-w-[300px] w-full md:w-1/3">
                        {!img.thumbnail ? (
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-[200px] object-cover rounded-lg shadow-md cursor-pointer"
                                onClick={() =>  dispatch({ type: 'show-project-image', payload: { image: img } })}
                            />
                        ) : (
                           <div
                                className="relative w-full h-[200px] cursor-pointer"
                                onClick={() =>  dispatch({ type: 'show-project-image', payload: { image: img } })}
                            >
                                <img
                                    src={img.thumbnail || '/default-video-thumbnail.png'}
                                    alt={`Thumbnail del video: ${img.alt}`}
                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black bg-opacity-50 rounded-full p-2">
                                    <Play className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <p className="text-sm text-cyan-300">{img.alt}</p>
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
