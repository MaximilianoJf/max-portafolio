export interface ProjectImage {
    id: number;
    src: string;
    alt: string;
    category: string;
    type: 'image' | 'video';
    thumbnail?: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    url?: string;
    github?: string;
    image: string;
    technology: string[];
    featured?: boolean;
    images: ProjectImage[];
}

export interface Experience {
    title: string;
    company: string;
    description: string[];
    date: string;
    tech: string[];
}
