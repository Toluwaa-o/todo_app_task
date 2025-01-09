export const EditTaskForm = ({ updateTask, handleChange, task, errorMsg, deleteAndExit }) => {
    return (
        <form className="flex flex-col gap-6 w-[80vw]" onSubmit={updateTask}>
            {/* Input for task title */}
            <input
                type="text"
                name="info"
                aria-labelledby="Task Information"
                placeholder="example: Send project files"
                className="border-b-2 border-word px-2 py-1 w-[100%] outline-none focus:border-b-2 focus:border-my-cream dark:focus:border-my-cream-dark sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent text-words dark:text-words-dark"
                onChange={handleChange}
                value={task.info}
                autoFocus
            />

            {/* Select for task priority */}
            <select
                name="section"
                value={task.section}
                onChange={handleChange}
                className="font-bold opacity-80 text-words dark:text-words-dark mb-4 outline-none sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent dark:bg-gray-700 dark:border-gray-600 bg-gray-200 rounded-lg border-gray-300 p-2"
            >
                <option value="" disabled>select a category</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
            </select>

            {/* Checkbox for task completion status */}
            <span className="flex gap-4 items-center sm:w-[50vw] sm:m-auto sm:mb-4">
                <label htmlFor="done" className="opacity-80 text-words dark:text-words-dark">
                    Has the task been completed?
                </label>
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={handleChange}
                    name="done"
                />
            </span>

            {/* Textarea for task description */}
            <textarea
                name="desc"
                aria-labelledby="Task Information"
                placeholder="example: I need to send the project files as soon as possible."
                className="border-2 border-word px-2 py-1 w-[100%] outline-none focus:border-b-2 focus:border-my-cream dark:focus:border-my-cream-dark mb-4 sm:w-[50vw] sm:m-auto sm:mb-4 bg-transparent text-words dark:text-words-dark h-[100px]"
                onChange={handleChange}
                value={task.desc}
            />

            {/* Display error message */}
            {errorMsg && <p className="text-red-600 text-center lowercase font-bold">{errorMsg}</p>}

            {/* Submit button for updating the task */}
            <button
                type="submit"
                className="bg-my-green text-white p-4 w-full rounded-md m-auto font-bold mt-4 sm:w-[30vw]"
            >
                Update Task
            </button>

            {/* Delete task button */}
            <p
                className="bg-red-500 text-white p-4 w-full rounded-md m-auto font-bold mt-4 text-center sm:w-[30vw]"
                onClick={deleteAndExit}
                role="button"
            >
                Delete Task
            </p>
        </form>
    )
}
