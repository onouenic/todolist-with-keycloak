import { getTasks } from "@/api/getTasks";
import { TasksContext } from "@/app/context/Task.context";
import { useContext, useRef, useState } from "react";

export default function FormTask() {

  const [name, setName] = useState('');
  const { dispatch } = useContext(TasksContext);
  const [ error, setError ] = useState('');

  const handleChange = (e: { target: { value: string; }; }) => {
    const { value } = e.target;
    setName(value);
  }
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (name.length <= 0) return setError('Digite o nome da tarefa');
    try {
      const res = await fetch('http://localhost:3000/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
      const data = await res.json();
      dispatch!({ type: 'ADD_TASK', payload: data })
    } catch (error) {
      console.log(error);
    }
    getTasks(dispatch);
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