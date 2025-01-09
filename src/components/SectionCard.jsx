import { useTasks } from './context';
import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { GetIcon } from "../components/GetIcon";

export const SectionCard = ({ name }) => {
    const { tasks, counts, addTask, removeTask, updateTaskInfo } = useTasks();
    let count = 0;

    // Determine the task count for the section
    if (counts[name] !== undefined) {
        // If the count exists in `counts`, use it
        count = counts[name];
    } else {
        // Otherwise, calculate based on the section type
        if (name === 'today') {
            // For 'today', count tasks that are not done
            count = tasks.filter(task => !task.done).length;
        } else {
            // For other sections like 'completed', count done tasks
            count = tasks.filter(task => task.done).length;
        }
    }

    return (
        <Link 
            to={`/tasks/${name}`} 
            className="flex bg-background dark:bg-background-dark p-4 shadow-lg rounded-md gap-4 w-full items-center dark:shadow-gray-600 dark:shadow-md"
        >
            <GetIcon name={name} /> {/* Render an icon based on the section name */}
            <span>
                <h2 className="font-bold text-[1.3rem] opacity-80 text-words dark:text-words-dark capitalize">
                    {name}{counts[name] !== undefined ? ' Priority' : ''}
                </h2>
                <p className="text-words dark:text-words-dark lowercase">
                    {count} {name === 'completed' ? 'completed' : 'active'} Tasks
                </p>
            </span>
            <SlOptionsVertical size={20} className="ml-auto" />
        </Link>
    );
};
