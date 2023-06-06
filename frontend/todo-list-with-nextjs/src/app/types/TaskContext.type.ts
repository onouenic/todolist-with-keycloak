import { ITaskAction } from "@/interfaces/TaskAction.interface";
import { ITaskProps } from "@/interfaces/TaskProps.interface";
import { Dispatch, SetStateAction } from "react";

export type TasksContextType = {
  dispatch: Dispatch<ITaskAction>
}