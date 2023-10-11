export async function Authentication(url, token) {
    return await fetch(url, {
       method:"POST",
       headers: {
           "Authorization": `Basic ${token}`
       },
   }).then(
           response => response.json()
       ).then(
           (data) => {
               return data
           }
       ).catch(
           error => console.error(error)
       )
}
export async function GetData(url, token, query) {
    return await fetch(url, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(query),
   }).then(
           response => response.json()
       ).then(
           (data) => {
               return data
           }
       ).catch(
           error => console.error(error)
       )
}
export function levelNeededXP(level) {
    return Math.round(level * (176 + 3 * level * (47 + 11 * level)));
}
export function calculateLevel(xp) {
    let level = 0

    while (levelNeededXP(++level) < xp) {}

    return level-1
}
export function roundUp(xp) {
    let roundedNumber = 0;
    let number = xp / 1000;
    if (number < 1000) {
        roundedNumber = Math.ceil(number / 100) * 100;
    } else {
        roundedNumber = Math.ceil(number / 1000) * 1000;
    }
    return roundedNumber;
}
export function roundUp2(number) {
    let roundedNumber = 0;
    if (number < 100) {
        roundedNumber = Math.ceil(number / 10) * 10;
    } else {
        roundedNumber = Math.ceil(number / 100) * 100;
    }
    return roundedNumber;
}
export function byteConversion(bytes) {
    const units = ['bytes', 'Kb', 'Mb'];
    let l = 0, n = parseInt(bytes, 10) || 1;
    while(n >= 1000 && ++l){
        n = n/1000;
    }
    return(n.toFixed(n < 10 && l > 0 ? 2 : 0) + ' ' + units[l]);
}
export function timeSince(start) {
    let oneDay = 1000 * 60 * 60 * 24
    let oneHour = 1000 * 60 * 60
    let oneMinute = 1000 * 60
    let startTime = new Date(start)
    let timeNow = Date.now()
    let days = Math.floor((timeNow - startTime) / (oneDay))
    let hours = Math.floor((timeNow - startTime - (days * oneDay)) / (oneHour))
    let minutes = Math.floor((timeNow - startTime - (days * oneDay) - (hours * oneHour)) / (oneMinute))
    return [days, hours, minutes]
}
export function formatLineGraphData(data, totalxp) {
    let formatedData = [
        {label: "November", value: 0},
        {label: "December", value: 0},
        {label: "January", value: 0},
        {label: "February", value: 0},
        {label: "March", value: 0},
        {label: "April", value: 0},
        {label: "May", value: 0},
        {label: "June", value: 0},
        {label: "July", value: 0},
        {label: "August", value: 0},
        {label: "September", value: 0},
        {label: "October", value: 0},
    ];
    let sizeType = byteConversion(totalxp).split(" ")[1]
    let divider = sizeType === "Kb" ? 1000 : 1000000
    data.forEach(e => {
        var date = new Date(e.createdAt);
        var month = date.toLocaleString('default', { month: 'long' });
        formatedData.forEach(obj => {
            if (obj.label === month) {
                obj.value = parseFloat((obj.value + e.amount / divider).toFixed(2), 10)
            }
        });
    });
    return formatedData;
}
export function formatBarGraphData(data) {
    let formatedData = [
        {label: "Data", value: 0, success: 0, fail: 0},
        {label: "Loop", value: 0, success: 0, fail: 0},
        {label: "Find", value: 0, success: 0, fail: 0},
        {label: "Time", value: 0, success: 0, fail: 0},
        {label: "Call-me-maybe", value: 0, success: 0, fail: 0},
        {label: "Dom", value: 0, success: 0, fail: 0},
        {label: "Object", value: 0, success: 0, fail: 0},
        {label: "Async", value: 0, success: 0, fail: 0},
        {label: "Node", value: 0, success: 0, fail: 0},
    ];
    data.forEach(node => {
      let questName = node.path.split("/")[4];
      formatedData.forEach(obj => {
        if (obj.label.toLowerCase() === questName) {
          obj.value ++;
          if (node.grade === 0) {
            obj.fail ++;
          } else {
            obj.success ++;
          };
        };
      });
    });
    return formatedData
}
export function fetchParams(token, query) {
    return {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(query),
    }
}