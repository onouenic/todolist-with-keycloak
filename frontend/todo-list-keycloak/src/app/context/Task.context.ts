'use client'

import { createContext } from "react";
import { TasksContextType } from "../types/TaskContext.type";

const TasksContextProps: TasksContextType = {
  dispatch: () => {},
}

export const TasksContext = createContext(TasksContextProps);
