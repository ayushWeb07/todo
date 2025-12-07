"use client"
import { useAddTodo } from '@/hooks/useAddTodo'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const AddTodoForm = () => {


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Low")


  const addTodoMutation = useAddTodo()

  const handleFormSubmit = async (e) => {

    e.preventDefault()

    try {
      const res = await addTodoMutation.mutateAsync({ title, description, priority })

      if (res?.success) {

        toast.success("Todo added!")

        setTitle("")
        setDescription("")
        setPriority("Low")
      }

      else {
        toast.error(res?.message)
      }
    } catch (error) {
      toast.error(`Something went wrong while adding todo. ${error}`)
    }
  }


  //   title: z.string().min(8).max(100).trim(),
  // description: z.string().min(20).max(200).trim(),
  // priority: z.enum(["Low", "Medium", "High"]).default("Low"),


  return (
    <form className="w-3/5 mx-auto" onSubmit={handleFormSubmit} >
      {/* Title */}
      <div className="mb-5">
        <label htmlFor="title" className="text-sm font-medium cursor-pointer">Title</label>
        <Input id="title" name="title" placeholder="Enter todo title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Description */}
      <div className="mb-5">
        <label htmlFor="description" className="text-sm font-medium cursor-pointer">Description</label>
        <Textarea id="description" name="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* Priority */}
      <div className="mb-5">
        <label htmlFor="priority" className="text-sm font-medium cursor-pointer">Priority</label>
        <Select value={priority} onValueChange={(v) => setPriority(v)} >
          <SelectTrigger id="priority" name="priority" className="cursor-pointer">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className="cursor-pointer" >
            <SelectItem className="cursor-pointer" value="Low">Low</SelectItem>
            <SelectItem className="cursor-pointer" value="Medium">Medium</SelectItem>
            <SelectItem className="cursor-pointer" value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button type={"submit"} className="w-full cursor-pointer" disabled={addTodoMutation?.isPending} >
        {addTodoMutation?.isPending? "Adding..." : "Add todo"}
      </Button>
    </form>
  )
}

export default AddTodoForm