import './index.css'
//import { StrictMode } from 'react'
import { routeTree } from './routeTree.gen'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from './components/theme-provider'
import { createDataApis } from './services/data'
import { ServiceApisContext } from './services/context'

// Create a new router instance
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const serviceApis = {
  data: createDataApis({
    basePath: "http://localhost:5163",
    credentials: "include"
  })
}

createRoot(document.getElementById('root')!).render(
    <ServiceApisContext.Provider value={serviceApis}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ServiceApisContext.Provider>,
)
