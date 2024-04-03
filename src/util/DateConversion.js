export function formatDate(dateObj) {
    dateObj = new Date(dateObj);
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    };
    return dateObj.toLocaleString('en-US', options);
}
