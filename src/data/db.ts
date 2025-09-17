import type { Project } from "../types"
import type { Job } from "../types";

export const db: Project[] = [
  {
    id: 1,
    name: "Guiñez Ingeniería - Sistema GDOC",
    description: "Sistema central para el área de prevención de riesgos de Guiñez Ingeniería, que integra múltiples módulos, incluyendo planificación de entregables mensuales para Salud, Seguridad del Trabajo y Medio Ambiente (SSTMA), gestión y reporte de hallazgos, incidentes, matriz legal, control documental y reportes gráficos basados en KPI por servicio.",
    url: "https://gssma.guinezapp.cl",
    github: "",
    image: "/images/project-thumbnails/gdoc_project_thumbnail.png",
    tecnology: ["PHP", "Laravel 10", "SQL", "JavaScript"],
    images: [
        {
          id: 1,
          src: "/images/project-details/gdoc_2.mp4",
          alt: "Video introductorio del sistema GDOC: Modulo SSTMA.",
          category: "Programa Calidad SST y MA",
          type: "video", 
          thumbnail: "/images/project-details/gdoc_2_thumbnail.png"
        },
        {
          id: 2,
          src: "/images/project-details/gdoc_1.png",
          alt: "Selección de modulos segun contrato sistema GDOC.",
          category: "Documentacion",
          type: "image", 
         
        },
        {
          id: 3,
          src: "/images/project-details/gdoc_3.png",
          alt: "Módulo dedicado a la gestión de los ítems de Calidad, Seguridad y Salud en el Trabajo (SST) y Medio Ambiente (MA).",
          category: "Programa Calidad SST y MA",
          type: "image", 
        },
        {
          id: 4,
          src: "/images/project-details/gdoc_4.png",
          alt: "Informe de avance contrato, modulo SSTMA.",
          category: "Programa Calidad SST y MA",
          type: "image", 
        },
         {
          id: 5,
          src: "/images/project-details/gdoc_5.png",
          alt: "Modulo de documentación de contratos, archivos y carpetas.",
          category: "Gestión Documental",
          type: "image", 
        },
        {
          id: 6,
          src: "/images/project-details/gdoc_6.png",
          alt: "Reporte de hallazgo en faena.",
          category: "Gestión de Hallazgos",
          type: "image", 
        },
        {
          id: 7,
          src: "/images/project-details/gdoc_7.png",
          alt: "Módulo enfocado en facilitar la entrega de documentación necesaria para el cumplimiento de los protocolos del Ministerio de Salud (MINSAL).",
          category: "Cumplimiento de Protocolos MINSAL",
          type: "image", 
        },
        {
          id: 8,
          src: "/images/project-details/gdoc_8.png",
          alt: "Navegación en los items de requerimientos para cumplimientos de protocolos MINSAL.",
          category: "Cumplimiento de Protocolos MINSAL",
          type: "image", 
        },


        {
          id: 9,
          src: "/images/project-details/gdoc_9.png",
          alt: "Entrega de evidencia para requerimientos del protocolo.",
          category: "Cumplimiento de Protocolos MINSAL",
          type: "image", 
        },
         {
          id: 10,
          src: "/images/project-details/gdoc_10.png",
          alt: "Módulo destinado al reporte de eventos por parte de la gerencia y los administradores de contrato.",
          category: "Extensión de Incidentes",
          type: "image", 
        },
        {
          id: 11,
          src: "/images/project-details/gdoc_11.png",
          alt: "Extensión de Incidente cerrada.",
          category: "Extensión de Incidentes",
          type: "image", 
        },
        {
          id: 12,
          src: "/images/project-details/gdoc_12.png",
          alt: "Módulo enfocado en facilitar la entrega de documentación necesaria para el cumplimiento de los protocolos del Ministerio de Salud (MINSAL).",
          category: "Cumplimiento de Protocolos MINSAL",
          type: "image", 
        },
        {
          id: 13,
          src: "/images/project-details/gdoc_13.png",
          alt: "Incidente aprobado para su Análisis.",
          category: "Gestión de incidentes",
          type: "image", 
        },

        {
          id: 14,
          src: "/images/project-details/gdoc_14.png",
          alt: "Exportar PDF del incidente",
          category: "Gestión de incidentes",
          type: "image", 
        },
        {
          id: 15,
          src: "/images/project-details/gdoc_15.png",
          alt: "Matriz de causas y acciones",
          category: "Gestión de incidentes",
          type: "image", 
        },

         {
          id: 16,
          src: "/images/project-details/gdoc_16.png",
          alt: "Módulo de capacitaciónd de usuarios en oficina.",
          category: "Capacitación de Usuarios",
          type: "image", 
        },
        {
          id: 17,
          src: "/images/project-details/gdoc_17.png",
          alt: "Multimedia Modulo de capacitación de usuarios.",
          category: "Capacitación de Usuarios",
          type: "image", 
        },

        {
          id: 18,
          src: "/images/project-details/gdoc_18.png",
          alt: "Formulario de capacitación Oficina",
          category: "Capacitación de Usuarios",
          type: "image", 
        },
        {
          id: 19,
          src: "/images/project-details/gdoc_19.png",
          alt: "Verificación de respuestas de capacitación",
          category: "Capacitación de Usuarios",
          type: "image", 
        },

        {
          id: 20,
          src: "/images/project-details/gdoc_20.png",
          alt: "Resumen avance en contratos.",
          category: "Programa Calidad SST y MA",
          type: "image", 
        },
        {
          id: 21,
          src: "/images/project-details/gdoc_21.png",
          alt: "Resumen de reporte de hallazgos.",
          category: "Gestión de Hallazgos",
          type: "image", 
        },

        {
          id: 22,
          src: "/images/project-details/gdoc_22.png",
          alt: "Resumen avance de contratos en modulo Cumplimiento de protocolos MINSAL",
          category: "Cumplimiento de Protocolos MINSAL",
          type: "image", 
        },
        {
          id: 23,
          src: "/images/project-details/gdoc_23.png",
          alt: "Estado de cumplimiento de extensiones por contrato",
          category: "Extensión de Incidentes",
          type: "image", 
        },


        {
          id: 24,
          src: "/images/project-details/gdoc_24.png",
          alt: "Graficos de Gestión de incidentes segun requerimientos especificos.",
          category: "Gestión de incidentes",
          type: "image", 
        },
       {
          id: 25,
          src: "/images/project-details/gdoc_25.png",
          alt: "Graficos de Gestión de incidentes segun requerimientos especificos.",
          category: "Gestión de incidentes",
          type: "image", 
        },
       {
          id: 26,
          src: "/images/project-details/gdoc_26.png",
          alt: "Graficos de Gestión de incidentes segun requerimientos especificos.",
          category: "Gestión de incidentes",
          type: "image", 
        },
    ],
    type: 1,
  },
 
  {
    id: 2,
    name: "Guiñez Ingeniería - Sistema Geomensura",
    description: 'Integración de un módulo de capacitaciones en la aplicación del área de Geomensura, orientado a difundir contenidos mediante videos informativos y documentos. Incluyó cuestionarios asociados a cada tema y herramientas para facilitar el seguimiento y verificación del cumplimiento de las capacitaciones por parte del personal en terreno.',
    url: "https://geomensura.guinezapp.cl/",
    image: "/images/project-thumbnails/geomensura_project_thumbnail.png",
    tecnology: ["PHP", "Laravel 10", "SQL", "JavaScript"],
     images: [
      {
        id: 1,
        src: "/images/project-details/geomensura_1.png",
        alt: "VIsor de capacitaciones realizadas.",
        category: "Capacitación de Usuarios",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/geomensura_2.png",
        alt: "Ingreso de usuario.",
        category: "Capacitación de Usuarios",
        type: "image", 
      },
      {
        id: 3,
        src: "/images/project-details/geomensura_3.png",
        alt: "Registro de usuario nuevo.",
        category: "Capacitación de Usuarios",
        type: "image", 
        },
      {
        id: 4,
        src: "/images/project-details/geomensura_4.png",
        alt: "Evaluación capacitación.",
        category: "Capacitación de Usuarios",
        type: "image", 
      },
      {
        id: 5,
        src: "/images/project-details/geomensura_5.png",
        alt: "Visualización multimedia de capacitación.",
        category: "Capacitación de Usuarios",
        type: "image", 
      },
      {
        id: 6,
        src: "/images/project-details/geomensura_6.png",
        alt: "Archivos y evaluaciones.",
        category: "Capacitación de Usuarios",
        type: "image", 
        },
    
    ],
    type: 1,
  },
  {
    id: 3,
    name: "Guiñez Ingeniería - Sistema SGD",
    description: 'Sistema desarrollado para organizar y administrar la documentación de los servicios "Servicio Integral de Geomensura" y "Servicio Integral de Administración de Muestras y Muestreo" de Minera Escondida.',
    url: "https://sgd.guinezapp.cl/",
    image: "/images/project-thumbnails/sgd_project_thumbnail.png",
    tecnology: ["PHP", "Laravel 10", "SQL", "JavaScript"],
    images: [
      {
        id: 1,
        src: "/images/project-details/sgd_1.png",
        alt: "Navegación en carpetas.",
        category: "Gestión Documental",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/sgd_2.png",
        alt: "Visor de archivos.",
        category: "Gestión Documental",
        type: "image", 
      },
      {
        id: 3,
        src: "/images/project-details/sgd_3.png",
        alt: "Selección de contratos.",
        category: "Gestión Documental",
        type: "image", 
      },

      {
        id: 4,
        src: "/images/project-details/sgd_4.png",
        alt: "Subir un archivo.",
        category: "Gestión Documental",
        type: "image", 
      },
      {
        id: 5,
        src: "/images/project-details/sgd_5.png",
        alt: "Administraciónde datos gerencia.",
        category: "Gestión Documental",
        type: "image", 
      },
      {
        id: 6,
        src: "/images/project-details/sgd_6.png",
        alt: "Gestión de usuarios.",
        category: "Gestión Documental",
        type: "image", 
      },
    ],
    type: 1,
  },
  {
    id: 4,
    name: "Sistema de Gestión para Servicio Técnico Automotriz",
    description: "Desarrollo de plataforma web para un servicio técnico automotriz en asp.net, dedicado a la gestión de la información, reporte de documentos y comunicación con clientes.",
    github: "https://github.com/MaximilianoJf/ServiciotecnicoMVC",
    image: "/images/project-thumbnails/automotriz_project_thumbnail.png",
    tecnology: ["C#", "ASP.NET", "MVC", "JavaScript", "SQL Server"],
    images: [
      {
        id: 1,
        src: "/images/project-details/automotriz_1.mp4",
        alt: "Video introductorio del sistema GDOC",
        category: "dashboard",
        type: "video", 
        thumbnail: "/images/project-details/automotriz_1_thumbnail.png"
      },
     
    ],
    type: 0,
  },
  {
    id: 5,
    name: "GuitarLA",
    description: "Carrito de compras - React Vite Project + useReducter + TypeScript.",
    github: "https://github.com/MaximilianoJf/guitarReact",
    url: "https://guitarmj.netlify.app",
    image: "/images/project-thumbnails/guitar_project_thumbnail.png",
    tecnology: ["React", "UseReducter ", "TypeScript", "JavaScript", "Tailwind"],
    images: [
      {
        id: 1,
        src: "/images/project-details/guitar_1.png",
        alt: "Carrito de compras",
        category: "React",
        type: "image", 
      },
     
    ],
    type: 0,
  },
  {
    id: 6,
    name: "Calorie Tracker",
    description: "Seguimiento de calorias y ejercicio - React Vite Project + useReducter + TypeScript.",
    github: "https://github.com/MaximilianoJf/calorie-tracker",
    url: "https://calorie-tracker-mj.netlify.app",
    image: "/images/project-thumbnails/calorie_project_thumbnail.png",
    tecnology: ["React", "UseReducter ", "TypeScript", "JavaScript", "Tailwind"],
    images: [
      {
        id: 1,
        src: "/images/project-details/calorie_1.png",
        alt: "Calculadora Form",
        category: "React",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/calorie_2.png",
        alt: "Registros de calorias consumidas y gastadas",
        category: "React",
        type: "image", 
      },
     
    ],
    type: 0,
  },
  
  {
    id: 7,
    name: "Calculadora de propinas",
    description: "Calculadora-propina - React Vite Project + useReducter + TypeScript.",
    url: "https://calculadora-propina-react-mj.netlify.app",
    image: "/images/project-thumbnails/propina_project_thumbnail.png",
    tecnology: ["React", "UseReducter ", "TypeScript", "JavaScript", "Tailwind"],
    images: [
      {
        id: 1,
        src: "/images/project-details/propina_1.png",
        alt: "Index",
        category: "React",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/propina_2.png",
        alt: "Agregando detalle",
        category: "React",
        type: "image", 
      },
     
    ],
    type: 0,
  },
  {
    id: 8,
    name: "Devstagram",
    description: "Devstagram - Laravel 10 - Livewire - PHP.",
    url: "https://calculadora-propina-react-mj.netlify.app",
    image: "/images/project-thumbnails/devstagram_project_thumbnail.png",
    tecnology: ["PHP", "Laravel ", "Livewire", "JavaScript", "Tailwind"],
    images: [
      {
        id: 1,
        src: "/images/project-details/devstagram_1.png",
        alt: "Login",
        category: "Laravel",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/devstagram_2.png",
        alt: "Crear Cuenta",
        category: "Laravel",
        type: "image", 
      },
       {
        id: 3,
        src: "/images/project-details/devstagram_3.png",
        alt: "Perfil",
        category: "Laravel",
        type: "image", 
      },
      {
        id: 4,
        src: "/images/project-details/devstagram_4.png",
        alt: "Crear Post",
        category: "Laravel",
        type: "image", 
      },
      {
        id: 5,
        src: "/images/project-details/devstagram_5.png",
        alt: "Ver Post",
        category: "Laravel",
        type: "image", 
      },
     
    ],
    type: 0,
  },
  {
    id: 9,
    name: "Bebidas React - api - OpenRouter",
    description: "Proyecto de Bebidas Api React Vite Project + Zustand + OpenRouter + Axios + TypeScript. El cual consulta a una Api de bebidas alcoholicas y permite generar en tiempo real recetas con IA",
    github: "https://github.com/MaximilianoJf/tragos-api",
    url: "https://recetas-bebidas-mj.netlify.app",
    image: "/images/project-thumbnails/bebidas_project_thumbnail.png",
    tecnology: ["React", "Zustand ", "TypeScript", "JavaScript", "Tailwind", "OpenRouter", "Zod" ,"Axios"],
    images: [
      {
        id: 1,
        src: "/images/project-details/bebidas_1.png",
        alt: "Respuesta Api",
        category: "React",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/bebidas_2.png",
        alt: "Agregar receta a favoritos",
        category: "React",
        type: "image", 
      },
        {
        id: 3,
        src: "/images/project-details/bebidas_3.png",
        alt: "State de favoritos",
        category: "React",
        type: "image", 
      },
        {
        id: 4,
        src: "/images/project-details/bebidas_4.png",
        alt: "Generar receta consultando a IA",
        category: "React",
        type: "image", 
      },
      
    ],
    type: 0,
  },
  {
    id: 10,
    name: "Pacientes React Zustand",
    description: "Proyecto realizado con TypeScript + React + React Hook Form + Zustand",
    github: "https://github.com/MaximilianoJf/pacientes-react",
    url: "https://pacientes-react-mj.netlify.app",
    image: "/images/project-thumbnails/pacientes_project_thumbnail.png",
    tecnology: ["React", "Zustand ", "TypeScript", "JavaScript", "Tailwind","Zod", "Axios"],
    images: [
      {
        id: 1,
        src: "/images/project-details/pacientes_1.png",
        alt: "Formulario",
        category: "React",
        type: "image", 
      },
      {
        id: 2,
        src: "/images/project-details/pacientes_2.png",
        alt: "Paciente agregado al state",
        category: "React",
        type: "image", 
      },
        {
        id: 3,
        src: "/images/project-details/pacientes_3.png",
        alt: "Validación React Hook Form",
        category: "React",
        type: "image", 
      },
    ],
    type: 0,
  },
  {
    id: 11,
    name: "Clima React Zustand",
    description: "Proyecto realizado con TypeScript + React + Axios + Zod + Zustand el cual consulta a una Api de Clima",
    github: "https://github.com/MaximilianoJf/clima-react",
    url: "https://clima-react-mj.netlify.app",
    image: "/images/project-thumbnails/clima_project_thumbnail.png",
    tecnology: ["React", "Zustand ", "TypeScript", "JavaScript", "Tailwind","Zod", "Axios"],
    images: [
      {
        id: 1,
        src: "/images/project-details/clima_1.png",
        alt: "Consulta api de clima",
        category: "React",
        type: "image", 
      },
    ],
    type: 0,
  },
   {
    id: 12,
    name: "Cripto React Zustand",
    description: "Proyecto realizado con TypeScript + React + Axios + Zod + Zustand el cual consulta a una Api de Criptomonedas",
    github: "https://github.com/MaximilianoJf/cripto-typescript",
    url: "https://cripto-react-mj.netlify.app",
    image: "/images/project-thumbnails/cripto_project_thumbnail.png",
    tecnology: ["React", "Zustand ", "TypeScript", "JavaScript", "Tailwind","Zod", "Axios"],
    images: [
      {
        id: 1,
        src: "/images/project-details/cripto_1.png",
        alt: "Consulta api de criptomonedas",
        category: "React",
        type: "image", 
      },
    ],
    type: 0,
  },
];


export const jobData: Job[] = [
  {
    name: "Guiñez Ingeniería",
    description: "Diseñé y desarrollé soluciones web para distintos servicios de la empresa, priorizando la experiencia de usuario y la organización funcional de los sistemas. Trabajé de forma integral en backend y frontend utilizando Laravel 10, JavaScript y bases de datos SQL. Todas las soluciones se desarrollaron bajo el patrón MVC (Modelo-Vista-Controlador) de Laravel, utilizando componentes nativos del framework, rutas restful, Eloquent ORM, Blade, controladores, middlewares, services, políticas de autorización, eventos y jobs. Además, participé en el análisis de requerimientos y solicitudes de clientes, impulsando la mejora continua de los módulos y la integración eficiente de los distintos servicios para optimizar su uso.",
    title: "Desarrollador Full Stack Laravel 10",
    url: "https://guinezingenieria.cl",
    logo: "/images/logo/guinez-logo.png"
   
  },
];

