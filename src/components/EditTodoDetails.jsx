"use client";
import React, { useState } from "react";

import { toast } from 'sonner'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEditTodoDetails } from "@/hooks/useEditTodoDetails";



const EditTodoDetails = ({ isOpen, onClose, todoId, orgTitle, orgDescription, orgPriority }) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState(orgTitle)
    const [description, setDescription] = useState(orgDescription)
    const [priority, setPriority] = useState(orgPriority)


    const editTodoDetailsMutation = useEditTodoDetails()

    const handleFormSubmit = async (e) => {

        e.preventDefault()

        try {
            const res = await editTodoDetailsMutation.mutateAsync({ todoId, title, description, priority })

            if (res?.success) {

                toast.success("Todo details updated!")

                onClose()
            }

            else {
                toast.error(res?.message)
            }

        } catch (error) {
            toast.error(`Something went wrong while updating the todo details. ${error}`)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose} // close when clicking outside
        >
            <form
                className="bg-card rounded-xl p-6 w-3/5"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleFormSubmit}
            >

                {/* Title */}
                <div className="mb-5">
                    <label htmlFor="title" className="text-sm font-medium cursor-pointer">Title</label>
                    <Input id="title" name="title" placeholder="Enter todo title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                {/* Description */}
                <div className="mb-5">
                    <label htmlFor="description" className="text-sm font-medium cursor-pointer">Description</label>
                    <Textarea id="description" name="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                {/* Priority */}
                <div className="mb-5">
                    <label htmlFor="priority" className="text-sm font-medium cursor-pointer">Priority</label>
                    <Select value={priority} onValueChange={(v) => setPriority(v)} >
                        <SelectTrigger id="priority" name="priority" className="cursor-pointer">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="cursor-pointer" >
                            <SelectItem className="cursor-pointer" value="Low">Low</SelectItem>
                            <SelectItem className="cursor-pointer" value="Medium">Medium</SelectItem>
                            <SelectItem className="cursor-pointer" value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Submit Button */}
                <Button type={"submit"} className="w-full cursor-pointer"
                //  disabled={addTodoMutation?.isPending} 
                >
                    {/* {addTodoMutation?.isPending ? "Adding..." : "Add todo"} */}
                    Update todo
                </Button>

                <Button variant={"outline"} className="w-full cursor-pointer mt-3"
                    onClick={onClose}
                >
                    Close
                </Button>

            </form>
        </div>
    );
};

export default EditTodoDetails;
