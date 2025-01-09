import { AiFillPlusCircle } from 'react-icons/ai'
import { GetIcon } from './GetIcon'
import { Link } from 'react-router'

export const AllTasksHeaderDetails = ({ count, name }) => {
    return (
        <>
            {/* Header details with icon and task count */}
            <span className="flex gap-4 items-center sm:m-auto md:grid md:grid-flow-col">
                <GetIcon name={name} /> {/* Display an icon based on the section name */}
                <span className="flex flex-col">
                    <p className="text-words dark:text-words-dark lowercase">
                        {count} {name === 'completed' ? 'completed' : 'active'} Tasks
                    </p>
                    <h2 className="font-bold text-3xl opacity-80 text-words dark:text-words-dark capitalize">
                        {name}
                    </h2>
                </span>
                {/* Link to create a new task */}
                <Link to='/new-task' className="z-10 ml-auto sm:ml-[50px]">
                    <AiFillPlusCircle color="#09D9B7" size={45} />
                </Link>
            </span>
        </>
    )
}
