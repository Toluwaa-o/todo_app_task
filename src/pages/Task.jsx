import { useEffect, useState } from 'react'
import { TiEdit } from "react-icons/ti";
import { useTasks } from '../components/context';
import { Link } from 'react-router-dom';

export const Task = ({ info, id, section, done }) => {
    const { tasks, counts, addTask, removeTask, updateTaskInfo } = useTasks();

    const [task, setTask] = useState({
        info, id, section, done
    })

    return (
        <Link to={`/tasks/edit/${id}`} className={`flex gap-4 ${task.done ? 'opacity-60' : 'opacity-100'} items-center`}>
            <input type="checkbox" checked={task.done} />
            <p className={`text-[0.9rem] text-words dark:text-words-dark font-bold ${task.done ? 'line-through' : ''} sm:text-base`}>{task.info}</p>
            <TiEdit size={25} color="#09D9B7" className='ml-auto' />
        </Link>
    )
}
