const getTimePeriod = () => {
    // Determines the time period (morning, afternoon, evening) based on the current hour of the day
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour >= 4 && hour < 12  ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : 'evening';

    return greeting;
}

export default getTimePeriod;
