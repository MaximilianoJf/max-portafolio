import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./views/Home/Home"
import Contact from "./views/Contact/Contact"
import Project from "./views/Project/Project"
import NotFound from "./views/NotFound"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "contacto",
                element: <Contact />
            },
            {
                path: "proyectos",
                element: <Project />
            }
        ],

    },
    {
        path: "*",
        element: <NotFound />
    }
])