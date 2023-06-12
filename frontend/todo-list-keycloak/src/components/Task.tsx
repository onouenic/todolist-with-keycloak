'use client'

import { useContext, useState } from "react";
import DeleteModal from "./DeleteModal";
import { TaskType } from "@/app/types/TaskProps.type";
import { TasksContext } from "@/app/context/Task.context";
import { useKeycloak } from "@react-keycloak/web";
import instanceAxios from "@/httpService/axios";
import { getTasks } from "@/api/getTasks";

export default function Task({ _id, index, name, completed }: TaskType) {

  const { dispatch } = useContext(TasksContext);
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const { keycloak } = useKeycloak();

  const handleCompleted = async () => {
    try {
      const axios = instanceAxios(keycloak);
      await axios.put(`http://localhost:3000/update-task/${_id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !completed }),
      })
      dispatch!({ type: 'UPDATE_TASK', payload: { _id, completed: !completed } })
    } catch (error) {
      console.log(error);
    }
    getTasks(dispatch, keycloak);
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }
  
  return (
    <ul className="flex justify-between items-center border shadow-md w-10/12 p-4 m-2 text-start">
      <li className="">{index + 1} -</li>
      <li className={`${completed ? ' line-through' : ''}`}>{name}</li>
      <li className="flex items-center justify-center gap-4">
        <button
          className={`
              border shadow-md rounded-md p-2
              ${completed
                ? 'bg-orange-600 hover:bg-orange-500 hover:transition-colors'
                : 'bg-emerald-600 hover:bg-emerald-500 hover:transition-colors'
              }`
            }
          onClick={handleCompleted}>
            {completed ? 'Refazer' : 'Concluir'}
        </button>
        <button
          className="border shadow-md rounded-md p-2 bg-red-600 hover:bg-red-500 hover:transition-opacity"
          onClick={handleOpenModal}>
            Excluir
        </button>
        {isOpenModal &&
         (<DeleteModal setIsOpenModal={setIsOpenModal} _id={_id}/>)
        }
      </li>
    </ul>
  )
}