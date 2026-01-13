export type ProjectImage = {
  id: number,
  src: string;
  alt: string;
  category: string,
  type: string,
  thumbnail?: string
};



export type Project = {
  id: number;
  name: string;
  description: string;
  url?: string;
  github?: string;
  image: string;
  tecnology?: string[];
  type: number; // 0: aprendizaje, 1: principal
  images?: ProjectImage[]; 
};


interface AccordionItem {
    title: string;
    content: string;
    name?: string;    
    url?: string;      
    logo?: string;     
}

export type Category = {
    title?: string;
    items: AccordionItem[];
}



export type SelectedProject = Project | null;
export type SelectedImage = ProjectImage | null;