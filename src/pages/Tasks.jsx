import { HiMenuAlt2 } from "react-icons/hi";
import { RiSunFoggyFill, RiSunFill } from "react-icons/ri";
import { FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GetGreeting } from "../components/GetGreeting";
import getTimePeriod from "../components/getTimePeriod";
import { SectionCard } from "../components/SectionCard";
import { useTasks } from "../components/context";

export const Tasks = () => {
    const { tasks } = useTasks();
    const sections = ['today', 'completed',, 'high', 'medium', 'low']

    const storedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
        document.body.className = theme; // Apply class to body for theme styles
        localStorage.setItem('theme', theme); // Store theme in localStorage
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="h-screen overflow-h-hidden relative flex flex-col py-[5vh] bg-background dark:bg-background-dark">
            <span className="bg-my-cream dark:bg-my-cream-dark w-[100vw] h-[60vh] rounded-[20%] absolute z-0 top-[-10vh] sm:w-[40vw] sm:h-[40vw] sm:left-[-10vw] sm:top-[-10vw] sm:rounded-[50%]"></span>
            <header className="z-10 p-4 flex flex-col gap-8 sm:w-[30%]">
                <HiMenuAlt2 size={35} />
                <span className="flex items-center justify-between px-4">
                    <span>
                        <GetGreeting />
                        <p className="text-[0.9rem] opacity-80 text-words dark:text-words-dark">Today you have {tasks.filter(task => !task.done).length} active tasks</p>
                    </span>
                    <span className="bg-white w-fit h-fit p-4 flex rounded-full" onClick={toggleTheme}>
                        {getTimePeriod() === 'morning' ? <RiSunFoggyFill size={65} color="#FFB30B" /> : getTimePeriod() === 'afternoon' ? <RiSunFill size={65} color="#FFB30B" /> : <FaMoon size={65} color="#00002B" opacity={0.8} />}
                    </span>
                </span>
            </header>

            <main className="z-10 p-4 flex flex-col gap-6 overflow-scroll hide-scrollbar-allow-scroll">
                {sections.map((name) => <SectionCard key={name} name={name} />)}
            </main>
        </div>
    )
}
