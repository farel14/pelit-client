// Formatting date to DD-Month-YYYY (e.g 25 July 2021)
export function dateFormatter(date) {
    let monthNames =["Jan","Feb","Mar","Apr",
                    "May","Jun","Jul","Aug",
                    "Sep", "Oct","Nov","Dec"];
    
    let day = date.getDate();
    
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    
    let year = date.getFullYear();
    
    return `${day} ${monthName} ${year}`;  
}