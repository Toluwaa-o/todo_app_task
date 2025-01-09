export const TaskFilter = ({ section }) => {
    return (
        <select
            name="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="font-bold opacity-80 text-words dark:text-words-dark outline-none sm:w-[50vw] sm:m-auto bg-transparent dark:bg-gray-700 dark:border-gray-600 p-2 bg-gray-200 rounded-lg border-gray-300"
        >
            <option value="all">show all tasks</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
        </select>
    )
}
