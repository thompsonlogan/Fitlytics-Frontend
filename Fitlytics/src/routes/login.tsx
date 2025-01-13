import LoginPage from '@/app/login/page'
import { createFileRoute } from '@tanstack/react-router'

type LoginSearchParams = {
  status?: string,
  message?: string
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => {
    return {
      status: search.status as string,
      message: search.message as string
    }
  }
})
