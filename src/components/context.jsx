import React, { createContext, useContext, useState } from "react";

export const TaskContext = createContext();

const TasksContextProvider = ({ children }) => {
    const [taskState, setTaskState] = useState(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const counts = { 'high': 0, 'medium': 0, 'low': 0 };
        savedTasks.forEach((task) => {
            if (counts[task.section] !== undefined && !task.done) {
                counts[task.section]++;
            }
        });
        return { tasks: savedTasks, counts };
    });
    // Helper function to update the counts
    const updateCategoryCounts = (tasks) => {
        const counts = { 'high': 0, 'medium': 0, 'low': 0 };
        tasks.forEach((task) => {
            if (counts[task.section] !== undefined && !task.done) {
                counts[task.section]++;
            }
        });
        setTaskState((prevState) => ({
            ...prevState,
            counts,
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Function to add a new task
    const addTask = ({ info, section, desc }) => {
        const lowerCaseArray = taskState.tasks.map((task) =>
            task.info.toLowerCase()
        );
        if (!lowerCaseArray.includes(info.toLowerCase())) {
            const newTask = {
                info,
                section,
                done: false,
                id: taskState.tasks.length,
                desc
            };

            const updatedTasks = [...taskState.tasks, newTask];
            setTaskState((prevState) => ({
                ...prevState,
                tasks: updatedTasks,
            }));
            updateCategoryCounts(updatedTasks);
        }
    };

    // Function to remove a task by id
    const removeTask = (id) => {
        const updatedTasks = taskState.tasks.filter((task) => task.id !== id);
        setTaskState((prevState) => ({
            ...prevState,
            tasks: updatedTasks,
        }));
        updateCategoryCounts(updatedTasks);
    };

    // Function to update a task's info, section, or done status
    const updateTaskInfo = ({ id, info, section, done, desc }) => {
        const updatedTasks = taskState.tasks.map((task) =>
            task.id === id
                ? { ...task, info, section, done, desc }
                : task
        );
        setTaskState((prevState) => ({
            ...prevState,
            tasks: updatedTasks,
        }));
        updateCategoryCounts(updatedTasks);
    };

    return (
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

export const useTasks = () => {
    return useContext(TaskContext);
};
