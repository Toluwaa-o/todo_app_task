import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../components/context';
import { NewTaskForm } from '../components/NewTaskForm';

export const NewTask = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { addTask } = useTasks(); // Access the `addTask` function from the task context

    // State to manage the task being created
    const [task, setTask] = useState({
        info: '', // Task title
        section: '', // Task category or priority
        desc: '', // Task description
    });

    // State for displaying error messages
    const [errorMsg, SetErrorMsg] = useState('');

    // Handle input changes dynamically for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value })); // Update the task state
    };

    // Function to handle task submission
    const submitTask = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate that all fields are filled
        if (!task.info || !task.section || !task.desc) {
            SetErrorMsg('Please fill all fields.'); // Set error message if validation fails
        } else {
            addTask({ ...task }); // Add the new task to the context
            return navigate(-1); // Navigate back to the previous page
        }
    };

    // Clear the error message automatically after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => SetErrorMsg(''), 5000);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [errorMsg]);

    return (
        <div className="h-screen overflow-h-hidden grid place-content-center gap-6 bg-background dark:bg-background-dark">
            {/* Page title */}
            <h1 className="text-words text-2xl font-bold opacity-80 dark:text-words-dark sm:text-center">
                Create New Task
            </h1>

            {/* Task creation form */}
            <NewTaskForm handleChange={handleChange} task={task} errorMsg={errorMsg} navigate={navigate} submitTask={submitTask} />
        </div>
    );
};
