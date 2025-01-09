import { HiMenuAlt2 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { useTasks } from "../components/context";
import { TaskGreetingAndToggle } from "../components/TaskGreetingAndToggle";

export const Tasks = () => {
    // Destructure tasks from context to use in the component
    const { tasks } = useTasks();

    // Define sections (task categories)
    const sections = ['today', 'completed', 'high', 'medium', 'low'];

    // Retrieve stored theme from localStorage or default to 'light'
    const storedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(storedTheme);

    // Apply the theme to the body class and store it in localStorage whenever the theme changes
    useEffect(() => {
        document.body.className = theme; // Apply class to body for theme styles
        localStorage.setItem('theme', theme); // Store theme in localStorage
    }, [theme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="h-screen overflow-h-hidden relative flex flex-col py-[5vh] bg-background dark:bg-background-dark">
            {/* Background circle that adjusts its size and position based on screen size */}
            <span className="bg-my-cream dark:bg-my-cream-dark w-[100vw] h-[60vh] rounded-[20%] absolute z-0 top-[-10vh] sm:w-[40vw] sm:h-[40vw] sm:left-[-10vw] sm:top-[-10vw] sm:rounded-[50%]"></span>

            {/* Header with task greeting and theme toggle */}
            <header className="z-10 p-4 flex flex-col gap-8 sm:w-[30%]">
                <HiMenuAlt2 size={35} /> {/* Menu icon */}

                {/* Greeting and active task count */}
                <TaskGreetingAndToggle tasks={tasks} toggleTheme={toggleTheme} />
            </header>

            {/* Main content area */}
            <main className="z-10 p-4 flex flex-col gap-6 overflow-scroll hide-scrollbar-allow-scroll">
                {/* Render SectionCard components for each section */}
                {sections.map((name) => <SectionCard key={name} name={name} />)}
            </main>
        </div>
    );
};
