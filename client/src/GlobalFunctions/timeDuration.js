const convertTimestampToDuration = (timestamp) => {
    const now = new Date();
    const pastTime = new Date(timestamp);
    const elapsedMilliseconds = now - pastTime;

    // Convert milliseconds to seconds, minutes, hours, days, months, and years
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximation
    const years = Math.floor(days / 365); // Approximation

    if (seconds < 60) {
        return seconds + "s";
    } else if (minutes < 60) {
        return minutes + "m";
    } else if (hours < 24) {
        return hours + "h";
    } else if (days < 30) {
        return days + "d";
    } else if (months < 12) {
        return months + " months";
    } else {
        return years + " years";
    }
};

export default convertTimestampToDuration;
