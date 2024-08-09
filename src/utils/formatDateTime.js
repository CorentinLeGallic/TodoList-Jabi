/**
 * Converts a Date object into a readable string
 * @param {Date} date - The date to be formatted.
 * @return {String} - The formatted date string.
 */

const formatDateTime = (date) => {

    // Get date values. Ex : Jeudi 8 août 2024 à 14h00
    const day = date.toLocaleDateString("fr-FR", { weekday: "long" }); // jeudi
    const dayNumber = date.getDate(); // 8
    const month = date.toLocaleDateString("fr-FR", { month: "long" }); // août
    const year = date.getFullYear(); // 2024
    const hours = date.getHours(); // 14
    const minutes = date.getMinutes(); // 0

    // Return the well-formatted date
    return `${day.charAt(0).toUpperCase() + day.slice(1)} ${dayNumber} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year} à ${hours}h${(minutes < 10 ? '0' : '') + minutes}`;
}

export default formatDateTime;