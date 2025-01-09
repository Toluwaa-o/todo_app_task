export const ShowAllTasks = ({ all, setAll }) => {
    return (
        <span className="flex gap-2 ml-auto sm:ml-8 text-words dark:text-words-dark">
            <label htmlFor="all">Show All Tasks:</label>
            <input
                type="checkbox"
                onChange={(e) => setAll(e.target.checked)}
                checked={all}
                name='all'
            />
        </span>
    )
}
