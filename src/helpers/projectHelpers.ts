import type { Project } from "../types";


export function ordenarProyectosPorTipo(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => b.type - a.type);
}

export function separarProyectos(projects: Project[]) {
  return {
    destacados: projects.filter(p => p.type === 1),
    aprendizaje: projects.filter(p => p.type === 0),
  };
}