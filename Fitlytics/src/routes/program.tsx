import ProgramPage from '@/app/program/page'
import { useAuthStore } from '@/stores/authstore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/program')({
  component: ProgramPage,
  beforeLoad: async ({ location }) => {
    const isUserAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isUserAuthenticated) {
      console.log(location)
      throw redirect({
        to: '/login',
        /*search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },*/
      })
    }
  },
})
