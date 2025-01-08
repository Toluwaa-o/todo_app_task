const getTimePeriod = () => {
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

    return greeting
}

export default getTimePeriod