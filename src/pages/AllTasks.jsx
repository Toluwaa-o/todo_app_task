import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { GetIcon } from "../components/GetIcon";
import { Task } from "./Task";
import { useTasks } from "../components/context";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export const AllTasks = () => {
    const { slug: name } = useParams();
    const navigate = useNavigate();

    const { tasks, counts, addTask, removeTask, updateTaskInfo } = useTasks();

    let count = 0

    if (counts[name] !== undefined) {
        count = counts[name]
    } else {
        if (name === 'today') {
            count = tasks.filter(task => !task.done).length
        } else {
            count = tasks.filter(task => task.done).length
        }
    }

    const [myTasks, setMyTasks] = useState([])
    const [all, setAll] = useState(false)
    const [section, setSection] = useState('all')

    useEffect(() => {
        if (counts[name] !== undefined) {
            if (all) {
                setMyTasks(tasks.filter(task => task.section === name))
            } else {
                setMyTasks(tasks.filter(task => task.section === name && !task.done))
            }
        } else {
            if (name === 'today') {
                if (section !== 'all') {
                    setMyTasks(tasks.filter((task) => !task.done && task.section === section))
                } else {
                    setMyTasks(tasks.filter((task) => !task.done))
                }
            } else {
                if (section !== 'all') {
                    setMyTasks(tasks.filter((task) => task.done && task.section === section))
                } else {
                    setMyTasks(tasks.filter((task) => task.done))
                }
            }
        }
    }, [tasks, all, section])

    return (
        <div className="h-screen overflow-h-hidden relative flex flex-col py-[5vh] gap-4 bg-background dark:bg-background-dark">
            <span className="bg-my-cream dark:bg-my-cream-dark w-[100vw] h-[25vh] rounded-[50%] absolute z-0 top-[-15vh]"></span>
            <header className="z-10 p-4 flex flex-col gap-8" >
                <IoIosArrowBack size={35} onClick={() => navigate(-1)} />
                <span className="flex gap-4 items-center">
                    <GetIcon name={name} />
                    <span className="flex flex-col">
                        <p className="text-words dark:text-words-dark lowercase">{count} {name == 'completed' ? 'completed' : 'active'} Tasks</p>
                        <h2 className="font-bold text-3xl opacity-80 text-words dark:text-words-dark capitalize">{name}</h2>
                    </span>
                    <Link to='/new-task' className="z-10 ml-auto sm:ml-[20%]">
                        <AiFillPlusCircle color="#09D9B7" size={45} />
                    </Link>
                </span>
                {counts[name] !== undefined ? <span className="flex gap-2 ml-auto sm:ml-8 text-words dark:text-words-dark">
                    <label htmlFor="all">Show All Tasks:</label>
                    <input type="checkbox" onChange={(e) => setAll(e.target.checked)} checked={all} name='all' />
                </span> : <select
                    name="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="font-bold opacity-80 text-words dark:text-words-dark outline-none sm:w-[50vw] sm:m-auto bg-transparent dark:bg-gray-700 dark:border-gray-600 p-2 bg-gray-200 rounded-lg border-gray-300"
                >
                    <option value="all">show all tasks</option>
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                </select>}
            </header>
            <main className="z-10 flex flex-col p-4 gap-6 overflow-scroll">
                {myTasks.length > 0 && myTasks.map((taskInfo) => (<Task key={taskInfo.id} {...taskInfo} />))}
            </main>
        </div>
    )
}
