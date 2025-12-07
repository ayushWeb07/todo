"use client";
import { useTodoStore } from "@/store/useTodoStore";
import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("http://localhost:8080/api/v1/todos/");
  const data = await res.json();
  return data;
};


const useTodos = () => {

  const setTodos = useTodoStore((state) => state.setTodos);

    return useQuery({
      queryKey: ["todos"],
      queryFn: async () => {
        const apiData= await fetchTodos()

        if(apiData?.isSuccess) {
            setTodos(apiData?.data?.todos) // update the zustand state

            return apiData?.data?.todos
        }

        else {
            throw new Error(apiData?.message)
        }
    
      },
    });
}




export {useTodos}