"use server";

// import { revalidatePath } from "next/cache";

// *add todo
const handleAddTodo = async (data) => {
  try {
    const { title, description, priority } = data;

    if (!title || !description || !priority) {
      return {
        success: false,
        message: "All fields are required!",
      };
    }

    const res = await fetch("http://localhost:8080/api/v1/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, priority }),
    });

    const apiData = await res.json();

    if (apiData?.isSuccess) {
      return {
        success: apiData?.isSuccess,
        message: apiData?.message,
        data: apiData?.data?.todo,
      };
    } else {
      let validationErrorMessage = ``;

      if (apiData?.errors && typeof apiData.errors === "object") {
        const [field, messages] = Object.entries(apiData.errors)[0] || [];
        if (field && Array.isArray(messages)) {
          validationErrorMessage = `${field} :- ${messages[0]}`;
        }
      }

      return {
        success: apiData?.isSuccess || false,
        message:
          `${
            validationErrorMessage?.length > 0
              ? validationErrorMessage
              : apiData?.message
          }` || `Something went wrong while adding a todo.`,
      };
    }
  } catch (error) {
    const apiData = error?.response?.data;

    return {
      success: apiData?.isSuccess || false,
      message:
        `${apiData?.message}` || `Something went wrong while adding a todo.`,
    };
  }
};


// *toggle todo status
const handleToggleTodoStatus = async (data) => {
  try {
    const { todoId, completed } = data;

    const res = await fetch(`http://localhost:8080/api/v1/todos/toggle-status/${todoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    const apiData = await res.json();



    if (apiData?.isSuccess) {
      return {
        success: apiData?.isSuccess,
        message: apiData?.message,
        data: apiData?.data?.todo,
      };
    } 
  } catch (error) {
    const apiData = error?.response?.data;

    return {
      success: apiData?.isSuccess || false,
      message:
        `${apiData?.message}` || `Something went wrong while toggling the todo status.`,
    };
  }
};


// *delete todo
const handleDeleteTodo = async (data) => {
  try {
    const { todoId } = data;

    const res = await fetch(`http://localhost:8080/api/v1/todos/${todoId}`, {
      method: "DELETE",
    });

    const apiData = await res.json();


    if (apiData?.isSuccess) {
      return {
        success: apiData?.isSuccess,
        message: apiData?.message,
        data: apiData?.data?.todo,
      };
    } 
  } catch (error) {
    const apiData = error?.response?.data;

    return {
      success: apiData?.isSuccess || false,
      message:
        `${apiData?.message}` || `Something went wrong while deleting the todo.`,
    };
  }
};

export { handleAddTodo, handleToggleTodoStatus, handleDeleteTodo };
