import type { Project, SelectedImage,ProjectImage, SelectedProject } from "../types";
import { db } from "../data/db";


const STORAGE_KEY = 'projectState';

export type ProjectActions =
  | { type: 'select-project'; payload: { project: Project } }
  | { type: 'show-project-image'; payload: { image: ProjectImage } }
  | { type: 'clear-selected-project' }
  | { type: 'clear-selected-image' }
  | { type: 'next-selected-image'; payload: { project: Project } }
  | { type: 'previous-selected-image'; payload: { project: Project } }

export type ProjectState = {
  data: Project[];
  selected: SelectedProject;
  selectedImage: SelectedImage;
};

export const getInitialState = (): ProjectState => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
        } catch {
      console.warn('Estado corrupto en localStorage, se ignora');
    }
  }

  return {
    data: db,
    selected: null,
    selectedImage: null,
  };
};

export const initialState: ProjectState = getInitialState();
export const projectReducer = (
    state: ProjectState = initialState,
    action: ProjectActions

) => {

    if(action.type === 'select-project'){
    
        return{
            ...state,
            selected: action.payload.project
        }
    }

    if(action.type === 'clear-selected-project'){
        return{
            ...state,
            selected: null
        }
    }

    if(action.type === 'show-project-image'){

      return{
          ...state,
          selectedImage: action.payload.image
      }
    }

    if(action.type === 'clear-selected-image'){

      

      return{
          ...state,
          selectedImage: null
      }
    }

      
    if (action.type === 'next-selected-image') {
      if (!state.selectedImage) return state;

      const images = action.payload.project.images ?? [];
      const sortedImages = [...images].sort((a, b) => a.id - b.id);
      const currentId = state.selectedImage.id;
      const currentIndex = sortedImages.findIndex(img => img.id === currentId);
      const nextIndex = (currentIndex + 1) % sortedImages.length;

      return {
        ...state,
        selectedImage: sortedImages[nextIndex],
      };
    }

    if (action.type === 'previous-selected-image') {
      if (!state.selectedImage) return state;

      const images = action.payload.project.images ?? [];
      const sortedImages = [...images].sort((a, b) => a.id - b.id);

      const currentId = state.selectedImage.id;
      const currentIndex = sortedImages.findIndex(img => img.id === currentId);
      const prevIndex = (currentIndex - 1 + sortedImages.length) % sortedImages.length;

      return {
        ...state,
        selectedImage: sortedImages[prevIndex],
      };
    }

    return state
}