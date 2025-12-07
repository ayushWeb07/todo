import AddTodoForm from "@/components/AddTodoForm";
import TodoFilters from "@/components/TodoFilters";
import TodosList from "@/components/TodosList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background p-25">
      <h1 className="text-primary text-5xl font-bold text-center" >Todos App</h1>

      <div className="mt-10">
        <AddTodoForm />
      </div>

      <div className="mt-10">
        <TodoFilters />
      </div>

      <div className="mt-20">
        <TodosList />
      </div>
    </div>
  );
}
