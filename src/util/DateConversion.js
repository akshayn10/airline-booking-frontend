export function formatDate(dateObj) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedDate = dateObj.toLocaleString('en-US', options);
    return formattedDate;
}
