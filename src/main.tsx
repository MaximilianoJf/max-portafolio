import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProjectProvider } from './context/projectContext.tsx'


const APP_VERSION = "1.0.3";

if (localStorage.getItem("app_version") !== APP_VERSION) {
  localStorage.clear();
  localStorage.setItem("app_version", APP_VERSION);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </StrictMode>,
)
