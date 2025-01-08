const getTimePeriod = () => {
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour >= 4 && hour < 12  ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : 'evening'

    return greeting
}

export default getTimePeriod