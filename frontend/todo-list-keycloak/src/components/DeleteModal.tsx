'use client'

import { getTasks } from "@/api/getTasks";
import { TasksContext } from "@/app/context/Task.context";
import instanceAxios from "@/httpService/axios";
import { useKeycloak } from "@react-keycloak/web";
import { useContext } from "react";

export default function DeleteModal({ setIsOpenModal, _id }: { setIsOpenModal: (arg0: boolean) => void; _id: string; }) {

  const { dispatch } = useContext(TasksContext);
  const { keycloak } = useKeycloak();

  const handleCloseModal = () => {
    setIsOpenModal(false);
  }

  const handleDelete = async () => {
    try {
      const axios = instanceAxios(keycloak);
      await axios.delete(`http://localhost:3000/delete-task/${_id}`, {
        method: 'DELETE',
      })
      dispatch!({ type: 'DELETE_TASK', payload: { _id } })
    } catch (error) {
      console.log(error);
    }
    getTasks(dispatch, keycloak);
  }

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-full h-full bg-black/60">
      <div className="flex flex-col gap-10 p-5 rounded-md border shadow-md bg-white">
        <span className="m-2 text-lg">Você tem certeza que deseja deletar essa tarefa ?</span>
        <div className="flex gap-4 justify-end items-center">
          <button className="border shadow-md rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
          <button className="border shadow-md rounded-md p-2" onClick={handleDelete}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}