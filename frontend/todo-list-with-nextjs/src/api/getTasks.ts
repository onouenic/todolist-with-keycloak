import { ITaskAction } from "@/interfaces/TaskAction.interface";
import { ITaskProps } from "@/interfaces/TaskProps.interface";
import { Dispatch, SetStateAction } from "react";

export const getTasks = async (setFetchedTasks: Dispatch<SetStateAction<ITaskProps[]>> | Dispatch<ITaskAction>): Promise<void> => {
  try {
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    setFetchedTasks(data)
  } catch (error) {
    console.log(error)
  }
}
