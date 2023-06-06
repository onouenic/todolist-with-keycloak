'use client'

import { getTasks } from "@/api/getTasks";
import FormTask from "@/components/FormTask";
import Task from "@/components/Task";
import { ITaskAction } from "@/interfaces/TaskAction.interface";
import { ITaskProps } from "@/interfaces/TaskProps.interface";
import { useKeycloak } from "@react-keycloak/web";
import { Dispatch, useEffect, useReducer, useState } from "react";
import { TasksContext } from "../context/Task.context";

function taskReducer(state: ITaskProps | ITaskProps[], action: ITaskAction): ITaskProps[] {
  switch(action.type) {
    case 'ADD_TASKS':
      return [...state as ITaskProps[], action.payload]
    case 'ADD_TASK':
      return [...state as ITaskProps[], action.payload]
    case 'UPDATE_TASK':
      if (Array.isArray(state)) {
      return state.map((task: ITaskProps) => {
        if (task._id === action.payload._id) {
          return { ...task, completed: action.payload.completed }
        }
      
        return task;
      })}
    case 'DELETE_TASK':
      if (Array.isArray(state)) {
        return state.filter((task: ITaskProps) => task._id !== action.payload._id)
      }
    default:
      return state as ITaskProps[];
  }
}

export default function TaskList() {

  const [ tasks, dispatch ]: [ITaskProps[], Dispatch<ITaskAction>] = useReducer(taskReducer, []);
  const [ fetchedTasks, setFetchedTasks ] = useState<ITaskProps[]>([]);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    getTasks(setFetchedTasks);
  }, [tasks])

  if (!initialized) {
    return <div>Loading...</div>
  }

  if (!keycloak.authenticated) {
    return <span>Não autorizado</span>
    // keycloak.login()
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full mb-10">
      <TasksContext.Provider value={{ dispatch }}>
        <FormTask />
        
        {fetchedTasks.map(
          (task: any, index: number) =>
            <Task
              key={task._id}
              index={index}
              _id={task._id}
              name={task.name}
              completed={task.completed}
            />
        )}
      </TasksContext.Provider>
    </div>
  )
}