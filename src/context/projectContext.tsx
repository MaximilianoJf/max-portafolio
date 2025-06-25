import { createContext, useReducer } from "react"
import type { Dispatch, ReactNode } from "react"
import { projectReducer, initialState } from "../reducers/project-reducer"
import type { ProjectState, ProjectActions } from "../reducers/project-reducer"

type ProjectContextProps = {
    state: ProjectState,
    dispatch: Dispatch<ProjectActions>
}

type ProjectProviderProps = {
    children: ReactNode
}

export const ProjectContext = createContext<ProjectContextProps>(null!)

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [state, dispatch] = useReducer(projectReducer, initialState)

    
    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    )

}
