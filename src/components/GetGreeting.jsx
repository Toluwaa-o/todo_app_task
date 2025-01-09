import getTimePeriod from "./getTimePeriod"; // Importing a helper function to determine the time period (morning, afternoon, evening)

export const GetGreeting = () => {
    // Call the helper function to get the current time period
    const greeting = getTimePeriod();

    // Return a greeting message based on the time period
    if (greeting === 'morning') {
        return <h1 className="text-2xl font-bold opacity-80 text-words dark:text-words-dark">Good Morning!</h1>;
    } else if (greeting === 'afternoon') {
        return <h1 className="text-2xl font-bold opacity-80 text-words dark:text-words-dark">Good afternoon!</h1>;
    } else {
        return <h1 className="text-2xl font-bold opacity-80 text-words dark:text-words-dark">Good evening!</h1>;
    }
};
