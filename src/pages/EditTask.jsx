import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useTasks } from '../components/context';
import { EditTaskForm } from '../components/EditTaskForm';

export const EditTask = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { slug: id } = useParams(); // Get the task ID from the route parameters

    const { tasks, updateTaskInfo, removeTask } = useTasks(); // Retrieve tasks and task-related functions from context

    // Find the task to be edited based on the ID from the URL
    const [task, setTask] = useState(tasks.find((task) => task.id === Number(id)));

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Update the task state dynamically based on the input field
        setTask((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    // Retrieve and manage the theme preference from localStorage
    const storedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(storedTheme);

    // Function to handle task update
    const updateTask = (e) => {
        e.preventDefault();
        if (!task.info || !task.desc) {
            SetErrorMsg('Please fill all fields.'); // Display an error if required fields are empty
        } else {
            updateTaskInfo({ ...task }); // Update task information in the context
            return navigate(-1); // Navigate back to the previous page
        }
    };

    // Function to delete a task and navigate back
    const deleteAndExit = () => {
        removeTask(Number(id)); // Remove the task using its ID
        return navigate(-1); // Navigate back to the previous page
    };

    // Manage error messages
    const [errorMsg, SetErrorMsg] = useState('');

    useEffect(() => {
        // Clear the error message after 5 seconds
        const timer = setTimeout(() => SetErrorMsg(''), 5000);
        return () => clearTimeout(timer); // Cleanup on component unmount or when errorMsg changes
    }, [errorMsg]);

    return (
        <div className="h-screen overflow-h-hidden grid place-content-center gap-6 relative bg-background dark:bg-background-dark">
            {/* Back button */}
            <span
                className={`absolute top-4 left-4 w-fit h-fit flex border-2 ${theme !== 'dark' ? '#000000' : '#FFF'} rounded-full sm:left-28 sm:top-28`}
                onClick={() => navigate(-1)}
            >
                <MdOutlineKeyboardBackspace size={27} color={theme !== 'dark' ? '#000000' : '#FFF'} />
            </span>

            <h1 className="text-words text-2xl font-bold opacity-80 dark:text-words-dark sm:text-center">Update Task</h1>

            {/* Form for editing task */}
            <EditTaskForm updateTask={updateTask} handleChange={handleChange} task={task} errorMsg={errorMsg} deleteAndExit={deleteAndExit} />
        </div>
    );
};
