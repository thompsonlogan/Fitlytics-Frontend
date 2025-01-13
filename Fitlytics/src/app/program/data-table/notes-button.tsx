import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function NotesButton() {
  return (
    <Dialog>
      <DialogTrigger>Notes</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This sections contains notes about the exercise</DialogTitle>
          <DialogDescription>
            These are some very important notes about how to properly perform this exercise along with
            a video demonstrating proper form for this lift
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
