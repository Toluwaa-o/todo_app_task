import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../components/context';

export const NewTask = () => {
    const navigate = useNavigate();

    const { addTask } = useTasks();

    const [task, setTask] = useState({
        info: '', section: '', desc: ''
    })

    const [errorMsg, SetErrorMsg] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const submitTask = (e) => {
        e.preventDefault()

        if (!task.info || !task.section || !task.desc) {
            SetErrorMsg('Please fill all fields.')
        } else {
            addTask({ ...task })
            return navigate(-1)
        }
    }

    useEffect(() => {
        setTimeout(() => SetErrorMsg(''), [5000])
    }, [errorMsg])

    return (
        <div className="h-screen overflow-h-hidden grid place-content-center gap-6 bg-background dark:bg-background-dark">
            <h1 className="text-words text-2xl font-bold opacity-80 dark:text-words-dark sm:text-center">Create New Task</h1>
            <form className="flex flex-col gap-2 w-[80vw]" onSubmit={submitTask}>
                <input type="text" name="info" aria-labelledby="Task Information" placeholder="example: Send project files" className="border-b-2 border-word px-2 py-1 w-[100%] outline-none focus:border-b-2 focus:border-my-cream dark:focus:border-my-cream-dark mb-4 sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent text-words dark:text-words-dark" onChange={handleChange} value={task.info} autoFocus />
                <select
                    name="section"
                    value={task.section}
                    onChange={handleChange}
                    className="font-bold opacity-80 text-words dark:text-words-dark mb-4 outline-none sm:w-[50vw] sm:m-auto sm:mb-4 bg-gray-200 rounded-lg border-gray-300 bg-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
                >
                    <option value="" disabled>select a category</option>
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                </select>

                <textarea name="desc" aria-labelledby="Task Information" placeholder="example: I need to send the project files as soon as possible." className="border-2 border-word px-2 py-1 w-[100%] outline-none focus:border-b-2 focus:border-my-cream dark:focus:border-my-cream-dark mb-4 sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent text-words dark:text-words-dark h-[100px]" onChange={handleChange} value={task.desc} />

                {errorMsg && <p className='text-red-600 text-center lowercase font-bold'>{errorMsg}</p>}
                <button type='submit' className="bg-my-green text-white p-4 w-full rounded-md m-auto font-bold mt-4 sm:w-[30vw]">Create Task</button>
                <p className="bg-red-500 text-white p-4 w-full rounded-md m-auto font-bold mt-4 text-center sm:w-[30vw]" onClick={() => navigate(-1)} role='button'>Cancel</p>
            </form>
        </div>
    )
}
