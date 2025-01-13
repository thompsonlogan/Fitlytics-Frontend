import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateProgramForm } from "./createProgramDialog"

export function ProgramBuilder() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<{ username: string } | null>(null)

  const handleFormSubmit = (data: { username: string }) => {
    setFormData(data)
    setIsDialogOpen(false)
  }

    /*return (
      <div className="flex justify-center h-screen">
        <Button >Login</Button>
      </div>
    )*/

  return (
    <div className="flex justify-center h-screen">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>Add Program</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Program</DialogTitle>
          </DialogHeader>
          <CreateProgramForm onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      {/*formData && (
        <div className="mt-4">
          <p>Form Data:</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )*/}
    </div>
  )
}
