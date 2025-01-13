import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

interface CreateProgramFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function CreateProgramForm({ onSubmit }: CreateProgramFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>Program Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Program" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your program.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Weeks</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} />
                </FormControl>
                <FormDescription>
                  How many weeks long is the program.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Days per Week</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} />
                </FormControl>
                <FormDescription>
                  How many weeks long is the program.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
