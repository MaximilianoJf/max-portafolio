import Jobs from "../components/project/Jobs";
import { default as ProjectComponent } from "../components/project/Projects";
import { useProject } from "../hooks/useProject";

export default function Experiencia() {
  const { state } = useProject();

  return (
    <>
      {state.selected === null && <Jobs />}
      <ProjectComponent />
    </>
  );
} 
