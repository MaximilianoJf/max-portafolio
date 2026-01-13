import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ProjectProvider } from './context/projectContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider>
      <main className='bg-background'>
        <RouterProvider router={router} />
      </main>
    </ProjectProvider>

  </StrictMode>,
)
