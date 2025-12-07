"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToggleTodoStatus } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/useTodoStore";

const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus);

  return useMutation({
    mutationFn: handleToggleTodoStatus,
    onSuccess: (res) => {

      if (res?.success) {
        toggleTodoStatus(res?.data?._id, res?.data?.completed); // update the zustand state
        queryClient.invalidateQueries(["todos"]); // Refetch
      }

    },
  });
};

export { useToggleTodoStatus };
