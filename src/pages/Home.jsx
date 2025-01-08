import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="p-8 max-w-screen h-screen overflow-h-hidden grid place-content-center gap-4 text-center bg-background dark:bg-background-dark sm:grid sm:grid-cols-2 sm:place-content-center sm:items-center sm:w-[70%] sm:m-auto">
            <img src='/Checklist-pana.png' alt='Checklist Work illustrations by Storyset' title="Checklist Work illustrations by Storyset" />
            <span className="grid gap-4 sm:flex sm:flex-col">
                <h1 className="text-words text-[1.4rem] font-bold opacity-80 dark:text-words-dark">Get Your Life Organized</h1>
                <p className="text-[1rem] text-words dark:text-words-dark sm:m-auto sm:w-[90%]">This is a simple and effective to-do list and task manager app which helps you manage time.</p>
                <Link to='/tasks' className="bg-my-green text-white p-4 w-[90%] rounded-md m-auto font-bold sm:w-[25vw]">Get Started</Link>
            </span>
        </div>
    )
}
