import './index.css'
//import { StrictMode } from 'react'
import { routeTree } from './routeTree.gen'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from './components/theme-provider'
import { createDataApis } from './services/data'
import { ServiceApisContext } from './services/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { persistQueryClient } from "@tanstack/react-query-persist-client"

// Create a new router instance
export const router = createRouter({ routeTree })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage})

persistQueryClient({
  queryClient,
  persister: sessionStoragePersister 
})

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
  <QueryClientProvider client={queryClient}>
    <ServiceApisContext.Provider value={serviceApis}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ServiceApisContext.Provider>
  </QueryClientProvider>,
)
