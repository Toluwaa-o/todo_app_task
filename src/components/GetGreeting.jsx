import getTimePeriod from "./getTimePeriod";

export const GetGreeting = () => {
    const greeting = getTimePeriod()

    if (greeting === 'morning') {
        return <h1 className="text-2xl font-bold opacity-80 text-words dark:text-words-dark">Good Morning!</h1>
    } else if (greeting === 'afternoon') {
        return <h1 className="text-2xl font-bold opacity-80 text-words dark:text-words-dark">Good afternoon!</h1>;
    } else {
        return <h1 className="text-2xl font-bold opacity-80 text-words dark:text-words-dark">Good evening!</h1>;
    }
}
