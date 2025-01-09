import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Task } from "./Task";
import { useTasks } from "../components/context";
import { useEffect, useState } from "react";
import { AllTasksHeaderDetails } from "../components/AllTasksHeaderDetails";
import { ShowAllTasks } from "../components/ShowAllTasks";
import { TaskFilter } from "../components/TaskFilter";

export const AllTasks = () => {
    const { slug: name } = useParams(); // Get the current section name from the URL parameters
    const navigate = useNavigate(); // Hook for programmatically navigating routes

    const { tasks, counts } = useTasks(); // Get tasks and task counts from the context

    let count = 0; // Initialize task count

    // Determine the task count based on the section name
    if (counts[name] !== undefined) {
        count = counts[name]; // Use predefined counts for priority sections
    } else {
        if (name === 'today') {
            count = tasks.filter(task => !task.done).length; // Count unfinished tasks for 'today'
        } else {
            count = tasks.filter(task => task.done).length; // Count completed tasks for 'completed'
        }
    }

    // State for filtering tasks and managing theme
    const [myTasks, setMyTasks] = useState([]); // Filtered tasks to display
    const [all, setAll] = useState(false); // Whether to show all tasks in a priority section
    const [section, setSection] = useState('all'); // Selected priority section filter
    const storedTheme = localStorage.getItem('theme') || 'light'; // Get theme from localStorage
    const [theme, setTheme] = useState(storedTheme); // Theme state

    // Update displayed tasks whenever tasks, `all`, or `section` changes
    useEffect(() => {
        if (counts[name] !== undefined) {
            // For priority sections
            if (all) {
                setMyTasks(tasks.filter(task => task.section === name)); // Show all tasks
            } else {
                setMyTasks(tasks.filter(task => task.section === name && !task.done)); // Show unfinished tasks
            }
        } else {
            // For 'today' and 'completed' sections
            if (name === 'today') {
                if (section !== 'all') {
                    setMyTasks(tasks.filter(task => !task.done && task.section === section)); // Filter by priority
                } else {
                    setMyTasks(tasks.filter(task => !task.done)); // Show all unfinished tasks
                }
            } else {
                if (section !== 'all') {
                    setMyTasks(tasks.filter(task => task.done && task.section === section)); // Filter by priority
                } else {
                    setMyTasks(tasks.filter(task => task.done)); // Show all completed tasks
                }
            }
        }
    }, [tasks, all, section]); // Dependencies for re-render

    return (
        <div className="h-screen overflow-h-hidden relative flex flex-col py-[5vh] gap-4 bg-background dark:bg-background-dark">
            {/* Decorative background element */}
            <span className="bg-my-cream dark:bg-my-cream-dark w-[100vw] h-[25vh] rounded-[50%] absolute z-0 top-[-15vh]"></span>

            <header className="z-10 p-4 flex flex-col gap-8">
                {/* Back button */}
                <IoIosArrowBack
                    size={35}
                    onClick={() => navigate(-1)}
                    color={theme !== 'dark' ? '#000000' : '#FFF'}
                />

                <AllTasksHeaderDetails count={count} name={name} />

                {/* Task filtering options */}
                {counts[name] !== undefined ? (
                    <ShowAllTasks all={all} setAll={setAll} />
                ) : (
                    <TaskFilter section={section} setSection={setSection} />
                )}
            </header>

            {/* Main content: list of tasks */}
            <main className="z-10 flex flex-col p-4 gap-6 overflow-scroll hide-scrollbar-allow-scroll">
                {myTasks.length > 0 && myTasks.map((taskInfo) => (
                    <Task key={taskInfo.id} {...taskInfo} /> // Render each task
                ))}
            </main>
        </div>
    );
};
