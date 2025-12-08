"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleEditTodoDetails } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/useTodoStore";

const useEditTodoDetails = () => {
  const queryClient = useQueryClient();

  const editTodoDetails = useTodoStore((state) => state.editTodoDetails);

  return useMutation({
    mutationFn: handleEditTodoDetails,
    onSuccess: (res) => {
      if (res?.success) {

        editTodoDetails(
          res?.data?._id,
          res?.data?.title,
          res?.data?.description,
          res?.data?.priority
        ); // update the zustand state

        queryClient.invalidateQueries(["todos"]); // Refetch
      }
    },
  });
};

export { useEditTodoDetails };
