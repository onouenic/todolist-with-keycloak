'use client'

import { getTasks } from "@/api/getTasks";
import { TasksContext } from "@/app/context/Task.context";
import instanceAxios from "@/httpService/axios";
import { useKeycloak } from "@react-keycloak/web";
import { useContext, useRef, useState } from "react";

export default function FormTask() {

  const [name, setName] = useState('');
  const { dispatch } = useContext(TasksContext);
  const [ error, setError ] = useState('');
  const { keycloak } = useKeycloak();

  const handleChange = (e: { target: { value: string; }; }) => {
    const { value } = e.target;
    setName(value);
  }
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (name.length <= 0) return setError('Digite o nome da tarefa');
    try {
      const axios = instanceAxios(keycloak);
      await axios.post('http://localhost:3000/create-task', {
        method: 'POST',
        body: JSON.stringify({ name }),
      })
        .then(response => {
          dispatch!({ type: 'ADD_TASK', payload: response.data })
        })
    } catch (error) {
      console.log(error);
    }
    getTasks(dispatch, keycloak);
    setError('');
  }

  return (
    <form className="flex flex-col gap-2 justify-center items-center m-10">
      <input
        className="border shadow-md p-2 rounded-md"
        type="text"
        placeholder="Digite a tarefa"
        onChange={handleChange}
        value={name}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <button className="border shadow-md p-2 rounded-md" onClick={handleSubmit}>Adicionar</button>
    </form>
  )
}