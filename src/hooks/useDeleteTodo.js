"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/useTodoStore";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return useMutation({
    mutationFn: handleDeleteTodo,
    onSuccess: (res) => {

      if (res?.success) {
        deleteTodo(res?.data?._id); // update the zustand state
        queryClient.invalidateQueries(["todos"]); // Refetch
      }

    },
  });
};

export { useDeleteTodo };
