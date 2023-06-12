'use client'

import instanceAxios from "@/httpService/axios";
import { ITaskAction } from "@/interfaces/TaskAction.interface";
import { ITaskProps } from "@/interfaces/TaskProps.interface";
import { Dispatch, SetStateAction } from "react";

export const getTasks = async (setFetchedTasks: Dispatch<SetStateAction<ITaskProps[]>> | Dispatch<ITaskAction>, keycloak: any) => {
  try {
    const axios = instanceAxios(keycloak)
    axios.get('http://localhost:3000/tasks', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response: { data: SetStateAction<ITaskProps[]> & ITaskAction; }) => {
        setFetchedTasks(response.data)
      })
      .catch((error: any) => console.log('error: ', error));
  } catch (error) {
    console.log(error)
  }
}
