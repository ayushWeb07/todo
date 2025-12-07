"use client"
import React from 'react'
import { Button } from './ui/button'
import { useTodoStore } from '@/store/useTodoStore'

const TodoFilters = () => {


    const filter = useTodoStore((state) => state.filter);
    const setFilter = useTodoStore((state) => state.setFilter);

    const totalCount = useTodoStore((state) => state.totalCount());
    const completedCount = useTodoStore((state) => state.completedCount());
    const pendingCount = useTodoStore((state) => state.pendingCount());




    return (
        <div className="flex gap-5 bg-card p-5 rounded-lg w-3/5 mx-auto items-center justify-center">
            <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={"flex gap-2 items-center justify-center cursor-pointer"}
            >
                All <span className={"w-5 h-5 text-sm bg-card text-primary rounded-lg"} >{totalCount}</span>
            </Button>

            <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
                className={"flex gap-2 items-center justify-center cursor-pointer"}

            >
                Completed <span className={"w-5 h-5 text-sm bg-card text-primary rounded-lg"} >{completedCount}</span>
            </Button>

            <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
                className={"flex gap-2 items-center justify-center cursor-pointer"}

            >
                Pending <span className={"w-5 h-5 text-sm bg-card text-primary rounded-lg"} >{pendingCount}</span>
            </Button>
        </div>
    )
}

export default TodoFilters