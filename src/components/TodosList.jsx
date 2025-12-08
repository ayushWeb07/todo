"use client"

import { useTodos } from "@/hooks/useTodos"
import { useTodoStore } from "@/store/useTodoStore"
import { Loader2 } from "lucide-react"
import TodoItem from "./TodoItem"
import { useMemo } from "react"

const TodosList = () => {

    const { data, isLoading, error } = useTodos()

    // filter the todos like this
    const todos = useTodoStore((state) => state.todos);
    const filter = useTodoStore((state) => state.filter);

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (filter === "completed") return todo?.completed;
            if (filter === "pending") return !todo?.completed;
            return true;
        });
    }, [todos, filter]);


    return (
        <div className="w-3/5 mx-auto">
            {isLoading ? (

                <div className="flex h-[20vh] items-center justify-center bg-card rounded-lg">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : (<>
                {
                    error ? (
                        <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-md text-sm font-semibold">
                            <span>Something went wrong!</span>
                        </div>
                    ) : (<>

                        {
                            filteredTodos?.length === 0 ? (

                                <div className="flex items-center gap-2 p-4 bg-blue-500/10 text-blue-500 rounded-md text-sm font-semibold">
                                    <span>No todos to show.</span>
                                </div>

                            ) : (
                                <div className="flex flex-col gap-5" >

                                    {
                                        filteredTodos?.map((t) => (
                                            <TodoItem key={t?._id} todo={t} />
                                        ))
                                    }

                                </div>

                            )
                        }
                    </>)
                }
            </>)}
        </div>
    )
}

export default TodosList