import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function LandingPage() {

  return (
    <div className="flex items-center justify-center h-screen">
      <Link to="/login">
        <Button >Login</Button>
      </Link>
    </div>
  )
}