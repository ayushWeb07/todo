"use client";

import { devtools } from "zustand/middleware";
import { create } from "zustand";

const useTodoStore = create(
  devtools(
    (set, get) => ({
      filter: "all",
      isLoading: false,
      todos: [],

      setTodos: (todos) => set({ todos }),

      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),

      setFilter: (filter) => set({ filter }),
      setIsLoading: (isLoading) => set({ isLoading }),

      totalCount: () => {
        const { todos } = get();

        return todos ? todos.length : 0;
      },

      completedCount: () => {
        const { todos } = get();

        return todos ? todos.filter((t) => t?.completed).length : 0;
      },

      pendingCount: () => {
        const { todos } = get();

        return todos ? todos.filter((t) => !t?.completed).length : 0;
      },

      toggleTodoStatus: (id, completed) =>
        set((state) => ({
          todos: state?.todos?.map((t) =>
            t?._id !== id ? t : { ...t, completed }
          ),
        })),


      deleteTodo: (id) =>
        set((state) => ({
          todos: state?.todos?.filter((t) => t?._id !== id)
        })),
    }),
    {
      name: "todos-store",
    }
  )
);

export { useTodoStore };
