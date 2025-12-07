"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/useTodoStore";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: handleAddTodo,
    onSuccess: (res) => {

      if (res?.success) {
        addTodo(res?.data); // update the zustand state
        queryClient.invalidateQueries(["todos"]); // Refetch
      }

    },
  });
};

export { useAddTodo };
