// Formatting date to DD-Month-YYYY (e.g 25 July 2021)
export function dateFormatter(date) {
<<<<<<< HEAD
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = date.getDate();

  let monthIndex = date.getMonth();
  let monthName = monthNames[monthIndex];

  let year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
}

export function monthYearFormatter(date) {
  let monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthIndex = date.getMonth();
  let monthName = monthNames[monthIndex];
  let year = date.getFullYear();

  return `${monthName} ${year}`;
}

export function monthFormatter(month) {
  let monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthName = monthNames[month - 1];

  return `${monthName}`;
}
=======
    let monthNames =["Jan","Feb","Mar","Apr",
                    "May","Jun","Jul","Aug",
                    "Sep", "Oct","Nov","Dec"];
    
    let day = date.getDate();
    
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    
    let year = date.getFullYear();
    
    return `${day} ${monthName} ${year}`;  
}

// Formatting month from numberic to string
export function monthFormatter(date) {
    let monthNames =["January","February","March","April",
                    "May","June","July","August",
                    "September", "October","November","December"];
    
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    
    return `${monthName}`;  
}
>>>>>>> 5d3f7e9cb2d7e576bb5174787d27fe227b80e2e4
