import { useTasks } from './context';
import { Link } from "react-router-dom"
import { SlOptionsVertical } from "react-icons/sl";
import { GetIcon } from "../components/GetIcon";

export const SectionCard = ({ name }) => {
    const { tasks, counts, addTask, removeTask, updateTaskInfo } = useTasks();
    let count = 0

    if(counts[name] !== undefined){
        count = counts[name]
    }else {
        if(name === 'today'){
            count = tasks.filter(task => !task.done).length
        }else {
            count = tasks.filter(task => task.done).length
        }
    }
    
    return (
        <Link to={`/tasks/${name}`} className="flex bg-background dark:bg-background-dark p-4 shadow-lg rounded-md gap-4 w-full items-center dark:shadow-gray-600 dark:shadow-md">
            <GetIcon name={name} />
            <span>
                <h2 className="font-bold text-[1.3rem] opacity-80 text-words dark:text-words-dark capitalize">{name}{counts[name] !== undefined ? ' Priority' : ''}</h2>
                <p className="text-words dark:text-words-dark lowercase">{count} {name == 'completed' ? 'completed' : 'active'} Tasks</p>
            </span>
            <SlOptionsVertical size={20} className="ml-auto" />
        </Link>
    )
}
