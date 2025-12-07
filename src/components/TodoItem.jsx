"use client"
import React from 'react'

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2, Calendar } from "lucide-react";
import { useToggleTodoStatus } from '@/hooks/useToggleTodoStatus';
import { toast } from 'sonner';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';

const TodoItem = ({ todo }) => {

  // const { title, description, priority, completed, createdAt } = todo;

  const colorByPriority = {
    Low: "bg-green-100 text-background font-bold",
    Medium: "bg-yellow-100 text-background font-bold",
    High: "bg-red-100 text-background font-bold",
  };


  const formattedDate = new Date(todo?.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });


  const toggleTodoStatusMutation = useToggleTodoStatus()
  const deleteTodoMutation = useDeleteTodo()


  const handleToggleTodoStatus = async () => {
    try {

      const res = await toggleTodoStatusMutation.mutateAsync({
        todoId: todo?._id,
        completed: !todo?.completed
      })

      if (!res?.success) {
        toast.error(res?.message)
      }

    } catch (error) {
      toast.error(`Something went wrong while toggling the status. ${error}`)

    }
  }



  const handleDeleteTodo = async () => {
    try {

      const res = await deleteTodoMutation.mutateAsync({
        todoId: todo?._id,
      })

      if(res?.success) {
        toast.success("Todo deleted!")
      }

      else {
        toast.error(res?.message)
      }

    } catch (error) {
      toast.error(`Something went wrong while deleting the todo. ${error}`)

    }
  }



  return (
    <Card className={`p-4 shadow-md`}>
      <div>
        <Button
          size="sm"
          variant={todo?.completed ? "default" : "outline"}
          onClick={handleToggleTodoStatus}
          className={`p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer`}
          title={todo?.completed ? "Mark as pending" : "Mark as completed"}
        >
          <Check className={`w-4 h-4 ${todo?.completed ? "opacity-100" : "opacity-60"}`} />
        </Button>
      </div>


      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className={`text-lg font-semibold truncate ${todo?.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {todo?.title}
          </h3>


          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${colorByPriority[todo?.priority]}`}>
              {todo?.priority?.toUpperCase()}
            </span>
          </div>
        </div>


        {description && (
          <CardContent className="p-0 mt-2 text-sm text-muted-foreground">
            <p className="truncate">{todo?.description}</p>
          </CardContent>
        )}


        <CardFooter className="p-0 mt-7 flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground">
            <span className="flex items-center text-xs text-muted-foreground gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>



          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDeleteTodo}
              aria-label="Delete todo"
              className="p-2 rounded cursor-pointer"
              title={"Delete todo"}

            >
              <Trash2 className="w-6 h-6" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

export default TodoItem