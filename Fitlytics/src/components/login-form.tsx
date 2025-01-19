import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter, useSearch } from '@tanstack/react-router'
import { useAuthStore } from "@/stores/authstore"
import { useQueryClient } from "@tanstack/react-query"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const searchParams = useSearch({ from: '/login' });
  const  { login } = useAuthStore()
  const queryClient = useQueryClient()

  const handleGoogleLogin = async () => {
    const returnUrl = encodeURIComponent("http://localhost:5173/login"); 
    window.location.href = `http://localhost:5163/api/Auth/external/login?provider=Google&returnUrl=${returnUrl}`;
  }

  useEffect(() => {
    const status = searchParams.status;
    const message = searchParams.message;

    if (status === "Success") {
      queryClient.invalidateQueries({queryKey: ["user"]}); 
      login()
      router.navigate({ to: '/dashboard' });
    } else if (status == "Error") {
      console.log(`External login failed: ${message}`);
    }
  }, [login, queryClient, router, searchParams])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path 
                      d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Microsoft
                </Button>
              </div>
            </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
