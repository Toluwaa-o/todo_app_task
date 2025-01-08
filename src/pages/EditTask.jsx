import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useTasks } from '../components/context';

export const EditTask = () => {
    const navigate = useNavigate();
    const { slug: id } = useParams();

    const { tasks, updateTaskInfo, removeTask } = useTasks();

    const [task, setTask] = useState(tasks.find((task) => task.id === Number(id)))

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setTask(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const updateTask = (e) => {
        e.preventDefault()
        if (!task.info || !task.desc) {
            SetErrorMsg('Please fill all fields.')
        } else {
            updateTaskInfo({ ...task })
            return navigate(-1)
        }
    }

    const deleteAndExit = () => {
        removeTask(Number(id))
        return navigate(-1)
    }

    const [errorMsg, SetErrorMsg] = useState('')

    useEffect(() => {
        setTimeout(() => SetErrorMsg(''), [5000])
    }, [errorMsg])

    const [iconColor, setIconColor] = useState('#000000');

    const toggleColor = () => {
        setIconColor(iconColor === '#000000' ? '#FF6347' : '#000000');
    };

    return (
        <div className="h-screen overflow-h-hidden grid place-content-center gap-6 relative bg-background dark:bg-background-dark">
            <span className='absolute top-4 left-4 w-fit h-fit flex border-2 border-black rounded-full sm:left-28 sm:top-28' onClick={() => navigate(-1)}>
                <MdOutlineKeyboardBackspace size={27} color='#000000' />
            </span>
            <h1 className="text-words text-2xl font-bold opacity-80 dark:text-words-dark sm:text-center">Update Task</h1>
            <form className="flex flex-col gap-6 w-[80vw]" onSubmit={updateTask}>
                <input type="text" name="info" aria-labelledby="Task Information" placeholder="example: Send project files" className="border-b-2 border-word px-2 py-1 w-[100%] outline-none focus:border-b-2 focus:border-my-cream dark:focus:border-my-cream-dark sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent text-words dark:text-words-dark" onChange={handleChange} value={task.info} autoFocus />

                <select
                    name="section"
                    value={task.section}
                    onChange={handleChange}
                    className="font-bold opacity-80 text-words dark:text-words-dark mb-4 outline-none sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
                >
                    <option value="" disabled>select a category</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>

                <span className='flex gap-4 items-center sm:w-[50vw] sm:m-auto sm:mb-4'>
                    <label htmlFor='done' className='opacity-80 text-words dark:text-words-dark' >Has the task been completed?</label>
                    <input type="checkbox" checked={task.done} onChange={handleChange} name='done' />
                </span>
                <textarea name="desc" aria-labelledby="Task Information" placeholder="example: I need to send the project files as soon as possible." className="border-2 border-word px-2 py-1 w-[100%] outline-none focus:border-b-2 focus:border-my-cream dark:focus:border-my-cream-dark mb-4 sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent text-words dark:text-words-dark h-[100px]" onChange={handleChange} value={task.desc} />

                {errorMsg && <p className='text-red-600 text-center lowercase font-bold'>{errorMsg}</p>}
                <button type='submit' className="bg-my-green text-white p-4 w-full rounded-md m-auto font-bold mt-4 sm:w-[30vw]">Update Task</button>
                <p className="bg-red-500 text-white p-4 w-full rounded-md m-auto font-bold mt-4 text-center sm:w-[30vw]" onClick={deleteAndExit} role='button'>Delete Task</p>
            </form>
        </div>
    )
}
