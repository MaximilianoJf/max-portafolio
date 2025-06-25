import type { Project } from "../../types";
import type { Dispatch } from "react";
import type { ProjectActions } from "../../reducers/project-reducer";
import { useNavigate } from "react-router-dom";
type Props = {
  projects: Project[];
  type: number;
  dispatch: Dispatch<ProjectActions>
};



export default function ProjectList({ projects,type, dispatch }: Props) {
  const navigate = useNavigate()

  return (
    <>
      <h2 className="font-extrabold mb-12 text-center mt-10 bg-gradient-to-r text-3xl from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent select-none">
       <h2 className="text-3xl font-extrabold text-center mt-10 mb-12 select-none bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
        {type === 1
            ? "Proyectos Destacados"
            : "Proyectos de Formación y Desarrollo"}
        </h2>
        </h2>
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
            <article
                key={project.id}
                className="card glass-card p-6 space-y-6 shadow-sm cursor-pointer hover:shadow-xl focus-within:shadow-xl focus-within:outline-none"
                tabIndex={0}
                onClick={() => {
                dispatch({ type: "select-project", payload: { project } });
                navigate("/proyectos");
                }}
            >
                <img
                    src={project.image}
                    alt={`Imagen del proyecto ${project.name}`}
                    className="rounded-lg w-full aspect-video object-cover shadow-md"
                    loading="lazy"
                />
                <div>
                <h3 className="text-2xl font-bold tracking-tight">
                    {project.name}
                </h3>
                <p className="text-cyan-200 text-base leading-relaxed">
                    {project.description.length > 150
                    ? project.description.substring(0, 150) + "..."
                    : project.description}
                </p>
                </div>
                <a
                    href={project.url}
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded transition"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar
                </a>
            </article>
            ))}
        </div>
    </>
  )
}
