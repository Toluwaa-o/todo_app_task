import React, { createContext, useContext, useState } from "react";

// Create a context for managing tasks
export const TaskContext = createContext();

const TasksContextProvider = ({ children }) => {
    // Initialize state for tasks and category counts (high, medium, low)
    const [taskState, setTaskState] = useState(() => {
        // Retrieve saved tasks from localStorage, or set an empty array if not found
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Initialize category counts for tasks
        const counts = { 'high': 0, 'medium': 0, 'low': 0 };

        // Update the counts for each task section (high, medium, low)
        savedTasks.forEach((task) => {
            if (counts[task.section] !== undefined && !task.done) {
                counts[task.section]++;
            }
        });

        // Return the tasks and their counts
        return { tasks: savedTasks, counts };
    });

    // Helper function to update the counts for task sections (high, medium, low)
    const updateCategoryCounts = (tasks) => {
        const counts = { 'high': 0, 'medium': 0, 'low': 0 };

        // Loop through tasks and update the count for each section
        tasks.forEach((task) => {
            if (counts[task.section] !== undefined && !task.done) {
                counts[task.section]++;
            }
        });

        // Update the state with the new counts
        setTaskState((prevState) => ({
            ...prevState,
            counts,
        }));

        // Store the updated tasks in localStorage for persistence
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Function to add a new task to the task list
    const addTask = ({ info, section, desc }) => {
        // Check if the task already exists (case-insensitive)
        const lowerCaseArray = taskState.tasks.map((task) =>
            task.info.toLowerCase()
        );

        if (!lowerCaseArray.includes(info.toLowerCase())) {
            // Create a new task object
            const newTask = {
                info,
                section,
                done: false, // New tasks are not done by default
                id: taskState.tasks.length, // Use the current length as a unique ID
                desc
            };

            // Add the new task to the existing tasks array
            const updatedTasks = [...taskState.tasks, newTask];

            // Update the state with the new task
            setTaskState((prevState) => ({
                ...prevState,
                tasks: updatedTasks,
            }));

            // Update the section counts and store the tasks in localStorage
            updateCategoryCounts(updatedTasks);
        }
    };

    // Function to remove a task by its ID
    const removeTask = (id) => {
        // Filter out the task with the given ID
        const updatedTasks = taskState.tasks.filter((task) => task.id !== id);

        // Update the state with the remaining tasks
        setTaskState((prevState) => ({
            ...prevState,
            tasks: updatedTasks,
        }));

        // Update the section counts and store the tasks in localStorage
        updateCategoryCounts(updatedTasks);
    };

    // Function to update a task's details (info, section, done status, description)
    const updateTaskInfo = ({ id, info, section, done, desc }) => {
        // Map through tasks and update the task with the matching ID
        const updatedTasks = taskState.tasks.map((task) =>
            task.id === id
                ? { ...task, info, section, done, desc } // Update the task
                : task // Keep other tasks unchanged
        );

        // Update the state with the modified task list
        setTaskState((prevState) => ({
            ...prevState,
            tasks: updatedTasks,
        }));

        // Update the section counts and store the tasks in localStorage
        updateCategoryCounts(updatedTasks);
    };

    return (
        // Provide the tasks, counts, and functions to children components
        <TaskContext.Provider
            value={{
                tasks: taskState.tasks,
                counts: taskState.counts,
                addTask,
                removeTask,
                updateTaskInfo,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TasksContextProvider;

// Custom hook to access the task context
export const useTasks = () => {
    return useContext(TaskContext);
};
