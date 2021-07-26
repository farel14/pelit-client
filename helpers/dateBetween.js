let monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

export function monthList(from, to) {
    var arr = [];
    var datFrom = new Date('1 ' + from);
    var datTo = new Date('1 ' + to);
    var fromYear =  datFrom.getFullYear();
    var toYear =  datTo.getFullYear();
    var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
        arr.push(monthNames[i%12]);
    }        

    return arr;
}

// console.log(diff('Feb 2021', 'Jul 2021'))