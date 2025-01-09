import { RiSunFill, RiSunFoggyFill } from "react-icons/ri"
import { GetGreeting } from "./GetGreeting"
import getTimePeriod from "./getTimePeriod"
import { FaMoon } from "react-icons/fa"

export const TaskGreetingAndToggle = ({ tasks, toggleTheme }) => {
    return (
        <span className="flex items-center justify-between px-4">
            <span>
                <GetGreeting /> {/* Component that displays a personalized greeting */}
                <p className="text-[0.9rem] opacity-80 text-words dark:text-words-dark">
                    Today you have {tasks.filter(task => !task.done).length} active tasks
                </p>
            </span>

            {/* Theme toggle button */}
            <span className="bg-white w-fit h-fit p-4 flex rounded-full" onClick={toggleTheme}>
                {/* Dynamic icon based on the time of day */}
                {getTimePeriod() === 'morning' ? (
                    <RiSunFoggyFill size={65} color="#FFB30B" />
                ) : getTimePeriod() === 'afternoon' ? (
                    <RiSunFill size={65} color="#FFB30B" />
                ) : (
                    <FaMoon size={65} color="#00002B" opacity={0.8} />
                )}
            </span>
        </span>
    )
}
